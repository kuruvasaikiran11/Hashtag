const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');
const AuthMiddleware = require('../middlewares/AuthMiddleware');
router.post("/signup", (req, res, next) => {
    const { username, email, password, confirmPassword } = req.body;

    // Check if all fields are provided
    if (!username || !email || !password || !confirmPassword) {
        return res.status(400).json({
            message: "All fields are required",
        });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            message: "Invalid email",
        });
    }

    // Validate password length
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({
            message: "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, and one special character",
        });
    }


    // Check if passwords match
    if (password !== confirmPassword) {
        return res.status(400).json({
            message: "Passwords do not match",
        });
    }

    next();
}, userController.signup);

router.post("/login", (req, res, next) => {
    const {username, password} = req.body;
    if(!username || !password){
        return res.status(404).json({
            message : "All fields are required"
        })
    }
    next();
}, userController.login);
router.get("/allUsers", userController.getAllUsers);
router.delete("/deleteUser/:id", userController.deleteUser);
router.get("/balance", AuthMiddleware.validateUser, userController.balance);

module.exports = router