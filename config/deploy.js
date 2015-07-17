/* jshint node: true */

module.exports = {
  production: {
    store: {
      type: "S3",
      accessKeyId: process.env.AWS_KEY,
      secretAccessKey: process.env.AWS_SECRET,
      bucket: "unicode.party",
      acl: 'public-read',
      hostName: "unicode.party",
      indexMode: "direct",
    },

    assets: {
      type: "s3",
      accessKeyId: process.env.AWS_KEY,
      secretAccessKey: process.env.AWS_SECRET,
      bucket: "unicode.party"
    }
  }
}
