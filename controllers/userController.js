import bcrypt from 'bcrypt';
import User from '../Model/UserModel.js';
import generateToken from '../config/generateToken.js';
import { signupValidator, signinValidator } from '../validator/validator.js';

const registerUser = async ( req, res, next ) => {
  
   const { nom, email, password, picture } = req.body;
  
  try {

    const result = await signupValidator.validateAsync({...req.body})

    const existUser = await User.findOne({ email });

  if (existUser) {
    res.status(400);
    throw new Error('This user are already exist');
  }
    if ( result ) {

       const user = await User.create({
    nom,
    email,
    password,
    picture,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      nom: user.nom,
      password: user.password,
      picture: user.picture,
      token: generateToken(user._id),
    });
  } 
    
  }
  else {
    res.status(404);
    throw new Error('user not found');
  }
    
  } catch (error) {
    next(error)
  }
  

};

const authUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = signinValidator.validateAsync( { ...req.body } )
    if ( result ) {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({
        message: "pas d'utilisateur a cet email",
        statut: false,
      });
      }
      const isOk = await bcrypt.compare(password, user.password);
        if (!isOk) {
          return res.json({
          message: 'mot de passe incorrect',
          statut: false,
        });
      }
      if (user && isOk) {
        res.json({
          _id: user._id,
          nom: user.nom,
          email: user.email,
          picture: user.picture,
          token: generateToken(user._id),
        });
      }
    }
    
  } catch (ex) {
    next(ex);
  }
};

const someUsers = async (req, res) => {
  const keyword = req.query.search
    ? {

      $or: [
        { nom: { $regex: req.query.search, $options: 'i' } },
        { email: { $regex: req.query.search, $options: 'i' } },
      ],

    } : {

    };

  const users = await User.find(keyword);
  res.send(users);
};

export { registerUser, authUser, someUsers };
