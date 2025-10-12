const router = require('express').Router();
const isAuthenticated = require('../middlewares/AuthMiddleware');
const { viewProfile, editProfile, updateProfile, deleteProfile } = require('../controllers/ProfileController');

router.get('/', isAuthenticated,  viewProfile);
router.get('/:id/edit', isAuthenticated, editProfile);
router.patch('/:id', isAuthenticated, updateProfile);
router.delete('/:id', isAuthenticated, deleteProfile);

module.exports = router