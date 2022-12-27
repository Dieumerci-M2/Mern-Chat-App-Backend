const express = require( 'express' )
const router = express.Router()

const { registerUser, authUser, SomeUsers } = require('../controllers/userController')
const protecte = require('../middlewares/AuthMiddleware')

router.post( '/', registerUser )
router.post( '/login', authUser )
router.get('/', SomeUsers, protecte)


module.exports = router;