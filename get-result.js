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

const result = redsys.processNotification({
  Ds_MerchantParameters: "eyJEc19EYXRlIjoiMjUlMkYwOSUyRjIwMTkiLCJEc19Ib3VyIjoiMTUlM0ExMiIsIkRzX1NlY3VyZVBheW1lbnQiOiIwIiwiRHNfQ2FyZF9Db3VudHJ5IjoiNzI0IiwiRHNfQW1vdW50IjoiNDk5OSIsIkRzX0N1cnJlbmN5IjoiOTc4IiwiRHNfT3JkZXIiOiI0NjQ2S2ZnQ2R3RG4iLCJEc19NZXJjaGFudENvZGUiOiIyMjMyMDE1NzUiLCJEc19UZXJtaW5hbCI6IjAwMSIsIkRzX1Jlc3BvbnNlIjoiMDAwMCIsIkRzX01lcmNoYW50RGF0YSI6IiU3QiUyMmZvbyUyMiUzQSUyMmJhciUyMiU3RCIsIkRzX1RyYW5zYWN0aW9uVHlwZSI6IjAiLCJEc19Db25zdW1lckxhbmd1YWdlIjoiMiIsIkRzX0F1dGhvcmlzYXRpb25Db2RlIjoiMjA1MzYxIiwiRHNfQ2FyZF9CcmFuZCI6IjEifQ==",
  Ds_Signature: "YXSgJrFOvSX-eGyLOjSqwK8SdTb81_KpzxC-UF_BmGY="
});

console.log(result);
