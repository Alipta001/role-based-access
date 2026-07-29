// const jwt = require('jsonwebtoken');

// const AuthCheck = (requiredRole) => {
//     return (req, res, next) => {
//         const token = req.cookies?.token;
//         const redirectPath = requiredRole === 'admin'
//             ? '/admin/login'
//             : requiredRole === 'manager'
//                 ? '/manager/login'
//                 : '/login';

//         if (!token) {
//             console.log('not logged in please login first');
//             return res.redirect(redirectPath);
//         }

//         try {
//             const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
//             if (requiredRole && decoded.role !== requiredRole) {
//                 return res.redirect(redirectPath);
//             }
//             req.user = decoded;
//             return next();
//         } catch (err) {
//             console.log('Authentication error:', err.message);
//             return res.redirect(redirectPath);
//         }
//     };
// };

// module.exports = AuthCheck;


const jwt = require("jsonwebtoken");

const AuthCheck = (requiredRole) => {
  return (req, res, next) => {
    try {
      // Accept token from HttpOnly cookie OR Bearer token
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
        process.env.JWT_SECRET
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
    } catch (err) {
      console.error("Authentication Error:", err.message);

      return res.status(401).json({
        status: false,
        message: "Invalid or expired token.",
      });
    }
  };
};

module.exports = AuthCheck;