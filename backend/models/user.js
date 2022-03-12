const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema;
const Schema = mongoose.Schema


const userSchema = new Schema({
    name: { type: String, required: true },
    phoneNumber: { type: Number, required: true, unique: true },
    password: { type: String, required: true },
    uploads: {
        type: Array,
        default:[],
      },
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)