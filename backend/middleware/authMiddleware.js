const jwt = require("jsonwebtoken");


const authMiddleware = (req, res, next) => {

  const token = req.headers.authorization;


  if (!token) {

    res.status(401).send("Access Denied");

    return;

  }


  try {

    const verified = jwt.verify(
      token,
      "mySecretKey"
    );

    req.user = verified;

    next();

  }

  catch (err) {

    res.status(401).send("Invalid Token");

  }

};

module.exports = authMiddleware;