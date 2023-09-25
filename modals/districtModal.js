const mongoose = require('mongoose')

const Schema = mongoose.Schema

const districtSchema = new Schema({
    districtName : {
        type : String,
        required : true
    },

    State_id : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    }
})

module.exports = mongoose.model('District' , districtSchema)