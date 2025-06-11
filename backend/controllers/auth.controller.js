import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateTokens.js";
// backend/controllers/auth.controller.js
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";




export const signup = async( req, res) => {
   try {
    const {fullName,username,password,confirmPassword,gender} = req.body;
    console.log(fullName,username,password,confirmPassword,gender);

    if(password !== confirmPassword){
        return res.status(400).json({error:"Passwords don't match"})
    }
    
    const user = await User.findOne({username});

    if(user){
        return req.status(400).json({error:"Username already exists"})
    }
     
    // HASH Password Here
    const salt =await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);
    //https://avatar-placeholder.iran.liara.run/
     
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`


    const newUser = new User({
        fullName,
        username,
        password: hashedpassword,
        gender,
        profilepic: gender === "male"? boyProfilePic : girlProfilePic,
    });
     
    if(newUser){
        // //Generate JWT token here
        generateTokenAndSetCookie(newUser._id,res);
    await newUser.save();

    res.status(201).json({
    _id: newUser._id,
    fullName: newUser.fullName,
    username:newUser.username,
    profilepic: newUser.profilePic,
 });
 } else {
    res.status(400).json({error: "Invalid user data"});
 }

   } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({error: "Internal server Error"});
   }   
};

export const login = async ( req, res) => {
    try {
        const {username, password} = req.body;
        console.log(username, password);
        const user = await User.findOne({username});
    const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

    if(!user || !isPasswordCorrect) {
        return res.status(400).json({error: "Invalid username or password"});
       }

   
       generateTokenAndSetCookie(user._id, res);

      res.status(200).json({
     _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilepic: user.profilepic,
 });
 
 }catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({error: "Internal server Error"});
   }
};
export const logout = ( req, res) => {
    try {
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({ message: "logged out successfully" });
    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({error: "Internal server Error"});
    }
    
};

// backend/controllers/auth.controller.js

// Add this function to your existing controller
export const deleteAccount = async (req, res) => {
    try {
      const userId = req.user._id; // Get user ID from the authenticated request
      
      // Delete user's conversations and messages first to avoid orphaned data
      await Conversation.deleteMany({ participants: userId });
      await Message.deleteMany({ senderId: userId });
      
      // Delete the user account
      const deletedUser = await User.findByIdAndDelete(userId);
      
      if (!deletedUser) {
        return res.status(404).json({ error: "User not found" });
      }
      
      // Clear the authentication cookie
      res.cookie("jwt", "", { 
        maxAge: 0,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production"
      });
      
      res.status(200).json({ message: "Account deleted successfully" });
    } catch (error) {
      console.error("Error in deleteAccount controller:", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  };