const jwtApp = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
    // ambil key authorization dalam header
    const {authorization} = req.headers;

    if (authorization === undefined) {
        res.statusCode = 400;
        return res.json({message: "Unauthorized"});
    }

    try {
        const splitedToken = authorization.split(" ")[1];
        console.log(splitedToken);
        // cek apakah token valid kalau tidak unathorized
        const token = await jwtApp.verify(
            splitedToken,
            "H@McQfTjWnZr4u7x!A%C*F-JaNdRgUkXp2s5v8y/B?E(G+KbPeShVmYq3t6w9z$C"
        );
        req.user = token;
        next();
    } catch (error) {
        res.statusCode = 400;
        return res.json({message: "invalid token"});
    }
};

module.exports = authMiddleware;
