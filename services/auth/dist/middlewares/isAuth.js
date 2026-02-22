import jwt from "jsonwebtoken";
export const isAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401).json({
                message: "Please Login - No auth Header"
            });
            return;
        }
        const token = authHeader.split(" ")[1];
        if (!token) {
            res.status(401).json({
                message: "Please Login - No token"
            });
            return;
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        if (!decodedToken || !decodedToken.user) {
            res.status(401).json({
                message: "Invalid Token"
            });
            return;
        }
        req.user = decodedToken.user;
        next();
    }
    catch (error) {
        res.status(500).json({
            message: "JWT Login Error"
        });
    }
};
