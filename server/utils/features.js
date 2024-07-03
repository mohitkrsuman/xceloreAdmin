import mongoose from "mongoose";

export const connectDB = async (uri) => {
   try {
     const dbConnect = await mongoose.connect(process.env.MONGO_DB_URI, {
       dbName: "xceloreAdmin",
     });
 
     if (dbConnect) {
       console.log(
         `Database connected successfully ${dbConnect.connection.host}`
       );
     }
   } catch (err) {
     console.log("Issue in connecting with database");
   }
 };