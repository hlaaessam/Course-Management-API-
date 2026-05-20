const jwt = require("jsonwebtoken");

module.exports = async (payload) => {
  // sign take three parameters first the payload (data want to encode in the token) second secret key to sign the token third options like expiration time
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: "1m",
  });

  return token;
};
