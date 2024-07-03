import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './utils/features.js';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
const app = express();
const PORT = process.env.PORT || 4121;

app.use(cors({
   origin: ["https://xcelore-admin.vercel.app"],
   methods: ["GET", "POST", "PUT", "UPDATE"],
 }));
app.use(express.json());
dotenv.config();

connectDB(process.env.MONGO_DB_URI);

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/admin', adminRoutes);

app.listen(PORT, () => {
   console.log(`Server is running on http://localhost:${PORT}`);
})