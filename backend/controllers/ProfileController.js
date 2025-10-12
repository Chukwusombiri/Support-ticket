const { generateToken } = require('../config/genJwt')

// @desc view profile
// @auth /api/show-profile
// @access Authenticated

const viewProfile = async ( req, res ) => {
    const { _id: id, name, email  } = req.user;
    res.status(200).json({ id, name, email  })
}

const editProfile = async (req, res) => {

}

const updateProfile = async (req, res) => {

}
const deleteProfile = async (req, res) => {

}

module.exports = {
    viewProfile,
    editProfile,
    updateProfile,
    deleteProfile
}