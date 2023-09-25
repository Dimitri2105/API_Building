const mongoose = require('mongoose')

const Schema = mongoose.Schema

const stateModal = new Schema({
    stateName : {
        type : String,
        required : true
    }
})

module.exports = new mongoose.model('State' , stateModal)