const express = require("express");
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  //get auth header value
  const authHeader = req.headers.authorization;
  //console.log(authHeader);
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    //console.log("line 10", token);
    req.authInfo = jwt.verify(token, "secretkey");
    next();
  } else {
    res.sendStatus(401);
  }
};
