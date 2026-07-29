const jwt = require("jsonwebtoken");

const AdminAuthCheck = (requiredRole) => {
  return (req, res, next) => {
    try {
      const token =
        req.cookies?.token ||
        req.headers.authorization?.split(" ")[1];

      if (!token) {
        return res.status(401).json({
          status: false,
          message: "Unauthorized. Please login first.",
        });
      }

      const decoded = jwt.verify(
        token,
        process.env.ADMIN_JWT_ACCESS_SECRET
      );

      if (
        requiredRole &&
        decoded.role !== requiredRole
      ) {
        return res.status(403).json({
          status: false,
          message: "Access denied.",
        });
      }

      req.user = decoded;

      next();
    } catch (error) {
      console.error(
        "AUTHENTICATION ERROR:",
        error.message
      );

      return res.status(401).json({
        status: false,
        message: "Invalid or expired token.",
      });
    }
  };
};

module.exports = AdminAuthCheck;