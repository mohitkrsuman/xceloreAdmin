import User from "../model/user.js";
import bcryptjs from "bcryptjs";

export const addUser = async (req, res) => {
  try {
    const { firstname, lastname, email, role, password } = req.body;
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
      role,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    return res.status(201).json({
      success: true,
      message: "User Created successfully",
      newUser,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const users = await User.find().lean().exec();
    return res.status(200).json({
      success: true,
      message: "All Users",
      users,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const editUser = async(req, res) => {
   try{
      const { firstname, lastname, role } = req.body;
      const { userId } = req.query;
      const user = await User.findOne({ _id: userId });
      if(!user){
         return res.status(400).json({
            success: false,
            message: "User not found"
         });
      }
      user.role = role;
      user.firstname = firstname;
      user.lastname = lastname;
      await user.save();

      return res.status(201).json({
         success: true,
         message: "User edited successfully",
         user
      });
   }catch(err){
      return res.status(500).json({
         success: false,
         message: "Error in editing the user"
      });
   }
}

export const deleteUser = async(req, res) => {
   try{
      const { userId } = req.query;
      await User.findByIdAndDelete({ _id: userId });

      return res.status(202).json({
         success: true,
         message: "User deleted successfully"
      });
   }catch(err){
      return res.status(500).json({
         success: false,
         message: "Error in deleting the user",
      });
   }
}
