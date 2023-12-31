const mongoose = require('mongoose')

const counter = require("./counterModel");


const Schema = mongoose.Schema

const setupConnection = require('../connect')

const districtSchema = new Schema({

    id: {
        type: Number,
        
    },

    districtName : {
        type : String,
        required : true
    },

    State_id : {
        // type : mongoose.Schema.Types.ObjectId,
        type : Number,
        ref : "State",
        required : true
    },
    isActive : {
        type : String,
    }
})

districtSchema.pre('save', function(next) {
    var doc = this;
    counter.findByIdAndUpdate({_id: 'entityId'}, {$inc: { seq: 1} }, {new: true, upsert: true}).then(function(count) {
        doc.id = count.seq;
        next();
    })
    .catch(function(error) {
        console.error("counter error-> : "+error);
        throw error;
    });
});

module.exports = new mongoose.model('District' , districtSchema)