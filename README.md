## How to setup

export REGION="us-east-1";
export ACCOUNT_ID=781619103453;
export EthMainnetApiKey="vCw7D0HPrlhH7jgMiEr-EHdW0xXxZTtC";
export EthGoerliApiKey="uZaCrnLBDS8P2lvmrcVmDfyo05CZ-4Di";
export PolygonMainnetApiKey="XPK_tKpmqMQXONxLLA9Vu6_qCNYIamqe";
export PolygonMumbaiApiKey="1YDxOM6_d8C8R96UqA9LjdyfoM-Pjpvj";

curl -X GET \
  'https://ywo7k1tlw0.execute-api.us-east-1.amazonaws.com/prod/isGodMode?address=0xE73Af8e443bE927f4D53c306F1d12eE13ae1dBFA&network=Polygon%20Mainnet' \
  -H 'cache-control: no-cache' \
  -H 'x-api-key:{REQUEST_API_KEY}

  curl -X GET \
  'https://ywo7k1tlw0.execute-api.us-east-1.amazonaws.com/prod/isGodMode?address=0x57ec4f7cf36f96cb0bdd8914ac57b9683693b0c0&network=Ethereum%20Mainnet' \
  -H 'cache-control: no-cache' \
  -H 'x-api-key:{REQUEST_API_KEY}