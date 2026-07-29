const permissions = require("./permission");

const Authorize = (...requiredPermissions) => {
    return (req, res, next) => {

        const role = req.user.role;

        const rolePermissions = permissions[role] || [];

        const allowed = requiredPermissions.every(permission =>
            rolePermissions.includes(permission)
        );

        if (!allowed) {
            return res.status(403).json({
                status: false,
                message: "Access Denied."
            });
        }

        next();
    };
};

module.exports = Authorize;