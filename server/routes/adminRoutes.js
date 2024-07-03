import express from 'express';
import { addUser, deleteUser, editUser, getAllUser } from '../controllers/adminController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { adminOnly } from '../middlewares/adminOnly.js';

const router = express.Router();

// GET localhost:4000/api/v1/admin/test
router.get('/test', (req, res) => {
   res.send("Hello router");
});

// POST /api/v1/admin/addUser
router.post("/addUser", adminOnly, addUser);

// GET /api/v1/admin/getAllUser
router.get("/getAllUser", adminOnly, getAllUser);

// POST /api/v1/admin/editUser
router.put("/editUser", adminOnly, editUser);

// POST /api/v1/admin/deleteuser
router.delete("/deleteUser", adminOnly, deleteUser);



export default router;