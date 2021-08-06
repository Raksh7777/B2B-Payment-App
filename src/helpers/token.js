const jwt = require("jsonwebtoken");

const giveToken = function (user) {
  const token = jwt.sign({ id: user }, "secretkey", { expiresIn: "7d" });
  console.log(token);
  return token;
};

//giveToken("AngryBird Chinmay")
module.exports = giveToken;
