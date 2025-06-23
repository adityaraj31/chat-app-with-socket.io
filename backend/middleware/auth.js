import User from '../models/User';

const jwt = require('jsonwebtoken');


// Middleware to protect roultes
export const protectRoute = async (req, res, next) => {
    try {
        const token = req.headers.token;

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decodedToken.userId).select("-password");

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        req.user = user;    
        next();
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
