const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require("dotenv").config();
module.exports.signup = async (req, res) => {
    try {
        const { username, email, password, confirmPassword } = req.body;

        // Check if all fields are provided
        if (!username || !email || !password || !confirmPassword) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({
                message: "Passwords do not match",
            });
        }

        // Check if user with the given email or username already exists
        const userExists = await User.findOne({ $or: [{ email: email }, { username: username }] });
        if (userExists) {
            return res.status(400).json({
                message: "User already exists",
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);


        // Create a new user
        const newUser = await User.create({
            username: username,
            email: email,
            password: hashedPassword,
            confirmPassword : hashedPassword,
        });

        return res.status(200).json({
            message: "User created successfully",
            user: newUser
        });
    } catch (err) {
        return res.status(500).json({
            message: "Internal Server Error",
            err: err
        });
    }
}

module.exports.login = async(req, res) => {
    try{
        const {username, password} = req.body;
        // if(!username || !password){
        //     return res.status(404).json({
        //         message : "All fields are required"
        //     })
        // }

        const user = await User.findOne({username : username});
        
        //Check if user exists
        if(!user){
            return res.status(404).json({
                message : "User doesn't exist"
            })
        }

        //Check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({
                message : "Invalid Credentials"
            })
        }

        //Generate token
        const token = jwt.sign(
            {
                username : user.username,
                id : user.id
            },
            process.env.JSON_WEB_SECRET_KEY,
            {
                expiresIn : "1h",
            }
        )
        // if(user.password !== password){
        //     return res.status(400).json({
        //         message : "Incorrect credentials"
        //     })
        // }

        // return res.status(200).json({
        //     message : "Login Successfull"
        // })

        return res.status(200).json({
            message : "Login Successful",
            username : user.username,
            id : user._id,
            email : user.email,
            token,
        })
    }catch(err){
        return res.status(500).json({
            message : "Internal Server Error"
        })
    }
}

module.exports.getAllUsers = async(req, res) => {
    try{
        const users = await User.find().select("-password");
        return res.status(200).json({
            users : users
        })
    }
    catch(err){
        return res.status(404).json({
            message : "Internal Server error"
        })
    }
}

module.exports.deleteUser = async(req, res) => {
    try{
        const {id} = req.params;
        const user = await User.findByIdAndDelete(id);
        if(!user){
            return res.status(400).json({
                message : "User not found"
            });
        }
        return res.status(200).json({
            message : "User successfully deleted"
        })
    }
    catch(err){
        return res.status(500).json({
            message : "Internal Server Error"
        })
    }
}

module.exports.balance = async(req, res) =>{
    // console.log(req.user);
    try{
        const user = await User.findById({_id : req.user.id});
        if(!user){
            return res.status(400).json({
                message : "User doesn't exist"
            })
        }

        return res.status(200).json({
            message : "Balance fetched Successfully",
            email : user.email,
            name : user.first_name + user.last_name,
            balance : user.balance
        })
    }catch(err){
        return res.status(500).json({
            message : err.message
        })
    }
}