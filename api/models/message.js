const mongoose = require('mongoose');
const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        reg: "User"
    },
    recepientId: {
        type: mongoose.Schema.Types.ObjectId,
        reg: "User"
    },
    messageType: {
        type: String,
        enum: ['text', 'image', 'voice', 'card']
    },
    message: String,
    imageUrl: String,
    timeStamp: {
        type: Date,
        default: Date.now
    }
})

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;