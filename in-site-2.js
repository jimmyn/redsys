const {
  Redsys,
  SANDBOX_URLS,
  PRODUCTION_URLS,
  TRANSACTION_TYPES,
  randomTransactionId
} = require("redsys-easy");

const redsys = new Redsys({
  secretKey: "sq7HjrUOBfKmC576ILgskD5srU870gJ7",
  urls: SANDBOX_URLS // Also PRODUCTION_URLS
});

const params = {
  // amount in smallest currency unit(cents)
  // 33.50€
  amount: 3350,
  order: '7290',
  idOper: '2f00488846eba132da0fe0b8a5669c3ad53364ee',
  merchantCode: "999008881",
  currency: "EUR",
  transactionType: TRANSACTION_TYPES.AUTHORIZATION,
  terminal: "1"
};

redsys.wsPetition(params).then(result => {
  console.log(result);
});
