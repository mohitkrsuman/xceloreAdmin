import User from "../model/user.js";

export const adminOnly = async(req, res, next) => {
   try{
      const { id } = req.query;
      const user = await User.findById({ _id: id });

      if(!user){
         return res.status(400).json({
            success: false,
            message: "User doesn't exist"
         });
      }

      if(user.role !== 'Admin'){
         return res.status(403).json({
            success: false,
            message: "You are not authorized to access this route"
         });
      }

      next();

   }catch(err){
      return res.status(500).json({
         success: false,
         message: "Internal Server Error"
      });
   }
}