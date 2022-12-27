const mongoose = require('mongoose');

const ConnectionDB = async() => {

    try {
        const conne = await mongoose.connect( process.env.MONGO_URI, {
            
        } )
        console.log(`MongoAtlas as Connect at : ${conne.connection.host}`.cyan.underline);
    } catch (error) {
        console.log( `error : ${ error.message }` );
        process.exit()
    }
   
}

module.exports = ConnectionDB
