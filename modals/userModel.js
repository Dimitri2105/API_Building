const mongoose = require('mongoose')

const Schema = mongoose.Schema

const counter = require('./counterModel')

const userSchema = new Schema ({
    id: {type: Number},
    
    username: {
        type: String,
        required: true
    },
    password : {
        type : String,
        required : true
    },
    lastActive : {
        type : String,
    }
    

})

userSchema.pre('save', function(next) {
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


module.exports = mongoose.model("User" , userSchema) 