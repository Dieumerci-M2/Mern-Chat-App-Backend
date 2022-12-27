const express = require( 'express' )
const router = express.Router()
const protecte = require('../middlewares/AuthMiddleware')

const {sendMessage, ViewMessages} = require('../controllers/MessageController')

router.post( '/', protecte, sendMessage )
router.get('/:chatId', protecte, ViewMessages)

module.exports = router;