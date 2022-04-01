const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter email'],
        // trim: true,
        // maxLength: [100, 'Room name cannot exceed 100 characters']
    },
    password : {
        type: String,
        required: true
    }
 
},{
    timestamps: true
})

module.exports = mongoose.models.User || mongoose.model('User', userSchema);