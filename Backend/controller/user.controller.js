import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import createTokenAndSaveCookie from "../jwt/generateToken.js";

export const signup = async (req,res) => {
    try {
    const {fullname,email,password,confirmPassword} = req.body;

    if(password !== confirmPassword) {
        return res.status(400).json({message: "Passwords do not match"});
    }

    const user = await User.findOne({ email });
    if(user) {
        return res.status(400).json({message: "User already exists"});
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const  newUser = await new User({
        fullname,
        email,
        password: hashedPassword,
    });
    await newUser.save();

    if(newUser){
        createTokenAndSaveCookie(newUser._id, res);
        //res.cookie("gola", "hola");
        return res.status(201).json({message: "User created successfully", user: {
            _id: newUser._id,
            fullname: newUser.fullname,
            email: newUser.email,
        }});
    }
    
} catch (error) {
    console.error("Error in user.controller.js:", error);
    return res.status(500).json({message: "Internal server error"});
}
};

export const login = async (req,res) => {
    const {email, password} = req.body;
    try {
        
        const user = await User.findOne({ email });
        if(!user) {
            return res.status(400).json({message: "User does not exist"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({message: "Invalid User credentials"});
        }
        createTokenAndSaveCookie(user._id, res);
        return res.status(200).json({message: "User logged in successfully", user: {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
        }});

    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error"});
    }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie('jwt');
        return res.status(200).json({message: "User logged out successfully"});
    } catch (error) {
        console.error("Error in user.controller.js:", error);
        return res.status(500).json({message: "Internal server error"});
    }
};

export const allUsers = async(req,res) => {
    try {
        const loggedInUser = req.user._id;
        const filteredUsers = await User.find({_id: {$ne: loggedInUser}}).select("-password");
        return res.status(200).json(filteredUsers);
    } catch (error) {
        console.error("Error in user.controller.js:", error);
        return res.status(500).json({message: "Internal server error"});
    }
}