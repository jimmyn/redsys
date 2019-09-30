const fs = require("fs");
const {
  Redsys,
  SANDBOX_URLS,
  PRODUCTION_URLS,
  TRANSACTION_TYPES,
  randomTransactionId
} = require("redsys-easy");

const redsys = new Redsys({
  secretKey: "brLWpQ0s68locO5pYn1X+Qqa78O3VT0e",
  urls: SANDBOX_URLS // Also PRODUCTION_URLS
});

const obj = {
  // amount in smallest currency unit(cents)
  // 49.99€
  amount: 4999,
  currency: "EUR",
  order: randomTransactionId(),
  merchantName: "MI COMERCIO",
  merchantCode: "223201575",
  merchantData: JSON.stringify({foo: 'bar'}),
  terminal: "1",
  transactionType: TRANSACTION_TYPES.AUTHORIZATION, // '0'
  merchantURL: "https://webhook.site/4f2e85fd-6626-482e-bf1c-efdd0fb7f1e5",
  successURL: "http://micomercio.com/compra/success",
  errorURL: "http://micomercio.com/compra/error",
  directPayment: true,
  lang: 'en'
};

const form = redsys.redirectPetition(obj);

fs.writeFileSync(
  "./redirect.html",
  `<html>
<head>
  <title>RedSys</title>
</head>
<body>
  <form name="from" action="${form.url}" method="POST">
    <input type="hidden" name="Ds_SignatureVersion" value="${form.body.Ds_SignatureVersion}" />
    <input type="hidden" name="Ds_MerchantParameters" value="${form.body.Ds_MerchantParameters}" />
    <input type="hidden" name="Ds_Signature" value="${form.body.Ds_Signature}" />
    <input type="submit" value="Go to pay">
  </form>
</body>
</html>`
);
