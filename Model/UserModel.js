const mongoose = require( 'mongoose' )
const bcrypt = require('bcrypt')

const UserModel = mongoose.Schema( {
    nom : {type : String, required : true},
    email : {
        type : String,
        required : true,
        lowercase : true,
        minLength: 5,
        unique: true
    },
    password: { type: String, required: true },
    picture: {
        type: String,
        default : 'https://res.cloudinary.com/md-chatapp-mern/image/upload/v1668690954/ti1nbpcrxaevqp9fjiks.jpg'
    }
},
{
    timestamps : true
}
)

UserModel.pre( 'save', async function ( next ){
    if ( !this.isModified ) {
        next()
    }
    const salt = await bcrypt.genSalt( 10 )
    this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model( 'User', UserModel )

module.exports = User