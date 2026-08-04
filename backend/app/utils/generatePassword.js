const crypto = require("crypto");

const generatePassword = () => {
  return crypto
    .randomBytes(8)
    .toString("base64")
    .replace(/[+/=]/g, "")
    .slice(0, 10);
};

module.exports = generatePassword;