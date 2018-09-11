const secrets = {
  dbUri: "mongodb://jelo:a9bc839993@ds151382.mlab.com:51382/jelotest"
};

const getSecret = key => secrets[key];

module.exports = getSecret;
