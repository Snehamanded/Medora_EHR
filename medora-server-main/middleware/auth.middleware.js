const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const CONFIG = require("../config/config");
const { ReE } = require("../services/util.service.js");

// ✅ Hash password
const hashPassword = async (password) => {
    return await bcrypt.hash(password, 12);
};

// ✅ Compare password
const comparePassword = async (password, hash) => {
    return await bcrypt.compare(password, hash);
};

// ✅ Generate JWT Tokens
const generateTokens = (user) => {
    const payload = { id: user.id, email: user.email, userTypeId: user.userTypeId };

    const accessToken = jwt.sign(payload, CONFIG.jwtSecret, {
        expiresIn: CONFIG.jwtAccessExpiry || "15m",
    });

    const refreshToken = jwt.sign(payload, CONFIG.jwtRefreshSecret, {
        expiresIn: CONFIG.jwtRefreshExpiry || "7d",
    });

    return { accessToken, refreshToken };
};

// ✅ Verify JWT token middleware
const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return ReE(res, "Authorization header missing", 401);

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, CONFIG.jwtSecret);
        req.user = decoded;
        next();
    } catch (err) {
        return ReE(res, "Invalid token", 401);
    }
};

module.exports = {
    hashPassword,
    comparePassword,
    generateTokens,
    verifyToken,
};
