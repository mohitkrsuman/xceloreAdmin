import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
   firstname: {
      type: String,
      required: true
   },
   lastname:{
      type: String,
      required: true
   },
   role:{
      type: String,
      default: 'user'
   },
   email: {
      type: String,
      required: true,
      unique: true
   },
   password: {
      type: String,
      required: true
   }
}, {timestamps: true});

const User = mongoose.model('User', userSchema);
export default User;