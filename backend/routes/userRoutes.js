const express = require('express');
const { protectRoute } = require('../middleware/auth.js');

const {
    signup,
    login,
    updateProfile,
    checkAuth
} = require('../controllers/userController.js');

const userRouter = express.Router();

// Route for user registration
userRouter.post('/signup', signup);

// Route for user login
userRouter.post('/login', login);

// Protected route for updating user profile
userRouter.put('/profile', protectRoute, updateProfile);

// Route to check authentication status
userRouter.get('/checkauth', protectRoute, checkAuth);

export default userRouter;
