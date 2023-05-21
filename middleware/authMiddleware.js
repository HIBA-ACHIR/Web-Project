const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
    const token = req.headers.authorization;
    console.log(token)
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        const verified = jwt.verify(token, process.env.TOKEN_KEY);
        req.Utilisateur = verified;
        next();
    } catch (err) {
        return res.status(403).json({ message: "Invalid token" });
    }
}

module.exports = authMiddleware;
