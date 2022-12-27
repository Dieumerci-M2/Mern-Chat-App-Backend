
const User = require('../Model/UserModel')
const generateToken = require( '../config/generateToken' )
const bcrypt=require("bcrypt")

const registerUser = async(req, res) => {
    const { nom, email, password, picture } = req.body

    if ( !nom || !email || !password ) {

        return res.status( 400 ).send( { message: 'Please complete all the field' } )
        
    } 
    
    const existUser = await User.findOne( { email } )
    
    if ( existUser ) {
        res.status( 400 )
        throw new Error('This user are already exist')
    }

    const user = await User.create( {
        nom,
        email, 
        password,
        picture,
    } )
    
    if ( user ) {
        res.status( 201 ).json( {
            _id: user._id,
            nom: user.nom,
            password: user.password,
            picture: user.picture,
            token: generateToken(user._id)
        })
    } else {
        res.status( 404 )
        throw new Error('user not found')
    }
    
} 

const authUser = async ( req, res, next ) => {
    

    try {
        const { email, password } = req.body
        const user = await User.findOne( { email } )
        if ( !user ) {
            return res.status( 404 ).json( {
                message: "pas d'utilisateur a cet email",
                statut: false
            } )
        }
        const isOk = await bcrypt.compare( password, user.password )
        if ( !isOk ) {
            return res.json( {
                message: "mot de passe incorrect",
                statut: false
            } )
        }
        if ( user && isOk ) {
            res.json( {
                _id: user._id,
                nom: user.nom,
                email: user.email,
                picture: user.picture,
                token: generateToken( user._id ),
            } );
        }

    } catch ( ex ) {
        next(ex)
    }
}

const   SomeUsers = async( req, res ) => {
    
    const keyword = req.query.search
        ? {

        $or: [
            { nom: { $regex: req.query.search, $options: 'i' } },
            { email: { $regex: req.query.search, $options: 'i' } }
        ],

    } : {
        
    };

    const users = await User.find( keyword)
    res.send( users )  
}

module.exports = { registerUser, authUser,  SomeUsers };