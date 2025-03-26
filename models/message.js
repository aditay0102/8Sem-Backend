import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    room: String,
    content: String,
    sender: String,
    timestamp: { type: Date, default: Date.now },
});

const Message = mongoose.model('Message', messageSchema);

export default Message;