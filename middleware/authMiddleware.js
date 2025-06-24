const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token is required!" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid Token!" });
  }
};

const authorizeRole = (...allowedRoles) => {
  return(req,res,next) => {
    if(!req.user || !allowedRoles.includes(req.user.role)){
      return res.status(403).json({message:"Access denied: Insufficient Permission"})
    }
    next()
  }
}

module.exports = { authMiddleware, authorizeRole };

