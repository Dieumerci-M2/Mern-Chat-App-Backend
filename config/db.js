import mongoose from 'mongoose';

const ConnectionDB = async () => {
  try {
    const conne = await mongoose.connect(process.env.MONGO_URI, {

    });
    console.log(`MongoAtlas as Connect at : ${conne.connection.host}`);
  } catch (error) {
    console.log(`error : ${error.message}`);
    process.exit();
  }
};

export default ConnectionDB;
