const bcrypt = require('bcrypt');
const User = require('../model/User');
const { generateToken } = require('../config/genJwt');


// @desc Regiser a user
// @route /api/register/
// @access public
const registerUser = async (req, res) => {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
        res.status(422);
        throw new Error("Fill out all fields");
    }

    // check if user already exist
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
        res.status(400);
        throw new Error("Email already exists in our records");
    }
    //hash password
    const pwdSalt = await bcrypt.genSalt(10);
    const hashPwd = await bcrypt.hash(password, pwdSalt);

    const user = await User.create({ name, email, password: hashPwd });
    if (user) {
        res.status(201).json({
            message: "Successful user registration",
            _id: user._id,
            name,
            email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400);
        throw new Error("You entered invalid details");
    }
}

// @desc Login a user
// @route /api/loign
// @access public
const loginUser = async (req, res) => {
    const {email, password } = req.body;

    if(!email || email.trim()=='' || !password || password.trim()==''){
        res.status(400);
        throw new Error("Please enter valid email or password");
    }

     // check if user already exist
    const existingUser = await User.findOne({ email: email });    

    if( !existingUser || !(await bcrypt.compare(password, existingUser.password)) ){
        res.status(400);
        throw new Error("Please enter a valid email or password");
    }

    res.status(200).json({
        _id: existingUser._id,
        email: existingUser.email,
        name: existingUser.name,
        token: generateToken(existingUser._id)
    });
}

module.exports = {
    registerUser,
    loginUser,    
}