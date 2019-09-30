const fs = require("fs");
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
  order: randomTransactionId(),
  merchantCode: "999008881",
  currency: "EUR",
  pan: "4548812049400004",
  CVV2: "123",
  merchantData: "bar",
  expiryDate: "1220", // MMYY format
  transactionType: TRANSACTION_TYPES.NO_AUTHENTICATION,
  terminal: "1"
};

redsys.wsPetition(params).then(result => {
  console.log(result);
});
