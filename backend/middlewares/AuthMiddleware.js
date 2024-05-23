const jwt = require('jsonwebtoken');
require("dotenv").config();
module.exports.validateUser = async(req, res, next) => {
    const token = req.headers['authorization'];
    if(!token){
        return res.status(400).json({
            message : "Acces denied, Token is required"
        })
    }
    //Decrypting the user jwt token and sending in req header
    jwt.verify(token, process.env.JSON_WEB_SECRET_KEY, (err, decoded) => {
        if(err){
            return res.status(400).json({
                message : "Invalid Token"
            })
        }
        req.user = decoded;
        next();
    })
}