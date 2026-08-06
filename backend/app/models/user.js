const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
    },
    address:{
        type: String
    },
    password: {
        type: String,
        required: true
    },
    department: {
        type: String,
    },
    role: {
        type: String,
        enum: ['admin', 'employee', 'manager'],
        default: 'employee'
    },

    firstLogin:{
        type:Boolean,
        default:true
    },

    status:{
        type:String,
        enum:["active","inactive","blocked"],
        default:"active"
    },

    refreshToken: {
      type: String,
      default: null,
    },

    isVerified: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    versionKey: false
});



module.exports = mongoose.model('User', UserSchema);