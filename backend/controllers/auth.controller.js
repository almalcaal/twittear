import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../lib/utils.js";

// @desc            Register a new user
// @route           POST /api/auth/signup
// @access          Public
export const userSignUp = async (req, res) => {
  const { fullName, username, email, password } = req.body;

  try {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ error: "Username already taken" });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: "Email is already in use" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters long" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      username,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      generateTokenAndSetCookie(res, newUser._id);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        email: newUser.email,
        followers: newUser.followers,
        following: newUser.following,
        profileImg: newUser.profileImg,
        coverImg: newUser.coverImg,
      });
    } else {
    }
    return res.status(400).json({ error: "Invalid user data" });
  } catch (err) {
    console.log("Error in userSignUp controller:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// @desc            Authenticate user && get token
// @route           POST /api/auth/login
// @access          Public
export const userLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    generateTokenAndSetCookie(res, user._id);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      email: user.email,
      followers: user.followers,
      following: user.following,
      profileImg: user.profileImg,
      coverImg: user.coverImg,
    });
  } catch (err) {
    console.log("Error in userLogin controller:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// @desc            Logout user && clear cookie
// @route           POST /api/auth/logout
// @access          Private
export const userLogout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0, httpOnly: true, expires: new Date(0) });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.log("Error in userLogout controller:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// @desc            Check user authentication on data update/refresh
// @route           GET /api/auth/check
// @access          Private
export const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.status(200).json(user);
  } catch (err) {
    console.log("Error in checkAuth controller", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
