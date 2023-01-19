import Message from '../Model/MessageModel.js';
import User from '../Model/UserModel.js';
import Chat from '../Model/ModelChat.js';
import { messageValidator } from '../validator/validator.js'

const sendMessage = async (req, res) => {
  const { content, chatId } = req.body;

  const result = messageValidator.validateAsync({...req.body})

  console.log(req.user);
  const newMessage = {
    sender: req.user._id,
    content,
    chat: chatId,
  };

  try {
    let message = await Message.create(newMessage);
    if ( result ) {
      message = await message.populate('sender', { nom: 1, picture: 1 });
      message = await message.populate('chat');
      message = await User.populate(message, {
      path: 'chat.users',
      select: 'nom email picture',
      });
    }
    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

    res.json( message );
    
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
};

const ViewMessages = async (req, res) => {
  try {
    console.log(req.params.chatId);
    const message = await Message.find({ chat: req.params.chatId })
      .populate('sender', { nom: 1, email: 1, picture: 1 })
      .populate('chat');

    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};

export { sendMessage, ViewMessages };
