const xmlParser = require('fast-xml-parser');
const soap = require('soap');
const crypto = require('crypto');
const js2xml = new xmlParser.j2xParser();

const SECRET = 'sq7HjrUOBfKmC576ILgskD5srU870gJ7';
const WS_URL =
  'https://sis-t.redsys.es:25443/sis/services/SerClsWSEntrada/wsdl/SerClsWSEntrada.wsdl';

const data = {
  DS_MERCHANT_ORDER: '9352',
  DS_MERCHANT_IDOPER: '29a7421255b2063b1c0ce8b800c3da6f905d96ad',
  DS_MERCHANT_MERCHANTCODE: '999008881',
  DS_MERCHANT_TRANSACTIONTYPE: '0',
  DS_MERCHANT_TERMINAL: '1',
  DS_MERCHANT_CURRENCY: '978',
  DS_MERCHANT_AMOUNT: '3350'
};

const zeroPad = (smth, blocksize) => {
  const buf = Buffer.from(smth.toString(), 'utf8');
  const pad = Buffer.alloc(
    (blocksize - (buf.length % blocksize)) % blocksize,
    0
  );
  return Buffer.concat([buf, pad]);
};

const encryptOrder = (merchantKey, orderRef) => {
  const secretKey = Buffer.from(merchantKey, 'base64');
  const iv = Buffer.alloc(8, 0);
  const cipher = crypto.createCipheriv('des-ede3-cbc', secretKey, iv);
  cipher.setAutoPadding(false);
  const paddedStr = zeroPad(orderRef, 8);
  return cipher.update(paddedStr, 'utf8', 'base64') + cipher.final('base64');
};

const sha256Sign = (merchantKey, order, params) => {
  const orderKey = Buffer.from(encryptOrder(merchantKey, order), 'base64');
  return crypto
    .createHmac('sha256', orderKey)
    .update(params)
    .digest('base64');
};

const signXmlPetition = (order, datosEntradaXML) => {
  const signature = sha256Sign(SECRET, order, datosEntradaXML);
  return `<REQUEST>
  ${datosEntradaXML}
  <DS_SIGNATUREVERSION>HMAC_SHA256_V1</DS_SIGNATUREVERSION>
  <DS_SIGNATURE>${signature}</DS_SIGNATURE>
</REQUEST>`;
};

soap.createClient(WS_URL, (err, client) => {
  if (err) throw err;
  const xmlData = js2xml.parse({DATOSENTRADA: data});
  const datoEntrada = signXmlPetition(data.DS_MERCHANT_ORDER, xmlData);
  client.trataPeticionAsync({datoEntrada}).then(res => {
    const xml = res[0].trataPeticionReturn;
    const result = xmlParser.parse(xml, { parseNodeValue: false });
    console.dir(result, {depth: 5});
  });
});
