// @desc Regiser a user
// @route /api/users/
// @access public
const registerUser = (req, res) => {
    res.send("Register User")
}

// @desc Login a user
// @route /api/user/loign
// @access public
const loginUser = (req, res) => {
    res.send("Login User")
}

module.exports = {
    registerUser,
    loginUser
}