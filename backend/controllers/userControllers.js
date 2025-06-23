import User from "../models/User.js"
import bcrypt from "bcrypt"
import generateToken from "../utils/generateToken.js"
import cloudinary from "../lib/cloudinary.js"

// Signup a new User
 export const signup = async(req, res) => {
    const { fullName, email, password, bio } = req.body;

    try {
        if(!fullName || !email || !password || !bio) {
            return res.json({success: false, message: "Missing Details"})
        }

        const user = await User.findOne({email});
        if(user) {
            return res.json({success: false, message: "User already exists"})
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User.create({fullName, email, hashedPassword, bio});

        const token = generateToken(newUser._id);

        res.json({success: true, message: "User created successfully", token, userData: newUser});

    } catch(error) {
        console.log(error.message);
        res.json({success: false, message: "Something went wrong"})
    }
}

// Controller to login a user
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.json({ success: false, message: "Please provide both email and password" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, userData.password);
        if (!isPasswordValid) {
            return res.json({ success: false, message: "Invalid password" });
        }

        const token = generateToken(user._id);

        res.json({
            success: true,
            message: "Logged in successfully",
            token,
            userData: user
        });

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: "Something went wrong" });
    }
}

// Contoller to check if user is authenticated 
export const checkAuth = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        res.json({
            success: true,
            userData: user
        });

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: "Authentication failed" });
    }
}

// Controller to update user profile details
export const updateProfile = async (req, res) => {
    try {
        const { profilePic, bio, fullName} = req.body;

        const userId = req.user._id;
        let updatedUser;

        if(!profilePic) {
            updateProfile = await User.findByIdAndUpdate(userId, {bio, fullName}, {new: true})
        }
        else {
            const upload = await cloudinary
        }
    }
}
