const express = require( 'express' )
const router = express.Router()
const protecte = require('../middlewares/AuthMiddleware')
const { chatEnter,
    chatOut,
    createGroup,
    remaneGroup,
    deleteGroup,
    addPersonGroup
} = require( '../controllers/ChatController' )

router.post( '/',protecte, chatEnter )
router.get( '/', protecte, chatOut )
router.post( '/group', protecte, createGroup )
router.put( '/rename', protecte, remaneGroup )
router.delete( '/delete', protecte, deleteGroup )
router.post('/add', protecte, addPersonGroup)

module.exports = router