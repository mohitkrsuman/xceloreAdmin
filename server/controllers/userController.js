import User from "../model/user.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const newUser = new User({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      newUser,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user,
      token,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const searchUser = async (req, res) => {
  try {
    const {val} = req.query;
    let filter_query = {};
    if(val) {
      filter_query.firstname = { $regex: '.*' + val + '.*'};
    }
    const allUsers = await User.find(filter_query).lean().exec();

    return res.status(200).json({
      success: true,
      allUsers
    });


  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
