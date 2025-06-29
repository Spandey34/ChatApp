import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const secureRoute = async (req, res, next) => {

    try {
        const token = req.cookies.jwt;
        if(!token) {
            return res.status(401).json({ message: "Unauthorized access, no token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_TOKEN);

        if(!decoded || !decoded.userId) {
            return res.status(401).json({ message: "Unauthorized access, invalid token" });
        }

        const user = await User.findById(decoded.userId).select("-password");

        if(!user) {
            return res.status(404).json({ message: "User not found" });
        }

        req.user = user; // Attach user to request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error("Error in secureRoute middleware:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export default secureRoute;