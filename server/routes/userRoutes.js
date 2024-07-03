import express from 'express';
import { loginUser, registerUser, searchUser } from '../controllers/userController.js';

const router = express.Router();


// GET localhost:4000/api/v1/user/test
router.get('/test', (req, res) => {
   res.send("Hello router");
});

// POST /api/v1/user/register
router.post('/register', registerUser);

// POST /api/v1/user/login
router.post('/login', loginUser);

router.get('/search', searchUser);


export default router;