const jwt = require('jsonwebtoken');
const User = require('../model/User');
const SECRET = process.env.JWT_SECRET;

const isAuthenticated = async (req, res, next) => {
    let token;

    const {authorization} = req.headers;
    
    if( !authorization || !authorization.startsWith('Bearer ') ){
        res.status(403).json({message: "No token provided or bad format"});        
    }

    try {
        token = (authorization.split(' '))[1]
        const decoded = jwt.verify(token, SECRET)
        req.user = await User.findById(decoded.id).select('-password');
        next();
    } catch (error) {
        console.dir("Auth middleware couldn't verify request user:", error)
        res.status(403).json({message: "Not authorized, token failed"});        
    }
}

module.exports = isAuthenticated