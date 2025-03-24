"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = require("jsonwebtoken");
var authenticateJWT = function (req, res, next) {
    var _a;
    // Get the token from the Authorization header
    var token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
    // If no token is provided, return a 403 Forbidden response
    if (!token) {
        return res.sendStatus(403); // Forbidden
    }
    // Verify the JWT token
    jsonwebtoken_1.default.verify(token, 'your_secret_key', function (err, user) {
        if (err) {
            return res.sendStatus(403); // Forbidden if verification fails
        }
        // Attach the decoded user information to the request object
        req.user = user;
        // Proceed to the next middleware or route handler
        next();
    });
};
// Export using ESModule syntax
exports.default = authenticateJWT;
