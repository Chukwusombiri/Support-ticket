const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;

const generateToken = (userId) => {
    return jwt.sign({id: userId}, SECRET, {
        expiresIn: '30d'
    })
}

module.exports = {
    generateToken
}