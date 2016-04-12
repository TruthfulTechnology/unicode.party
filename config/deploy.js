/* eslint node: true */
/* jshint node: true */

module.exports = function (deployTarget) {
  var ENV = {
    build: {},
    s3: {
      accessKeyId: process.env.AWS_KEY,
      secretAccessKey: process.env.AWS_SECRET,
      bucket: 'assets.unicode.party',
      region: 'us-east-1',
    },
    's3-index': {
      accessKeyId: process.env.AWS_KEY,
      secretAccessKey: process.env.AWS_SECRET,
      bucket: 'unicode.party',
      region: 'us-east-1',
      hostName: 'unicode.party',
      indexMode: 'direct',
      allowOverwrite: true,
    },
  };

  return ENV;
};
