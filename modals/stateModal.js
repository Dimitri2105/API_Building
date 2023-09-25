const mongoose = require('mongoose')

const Schema = mongoose.Schema

var CounterSchema = Schema({
    _id: {type: String, required: true},
    seq: { type: Number, default: 0 }
});
var counter = mongoose.model('counter', CounterSchema);


const stateModal = new Schema({
    stateId: {type: String},
    
    statename : {
        type : String,
        required : true
    }
})

stateModal.pre('save', function(next) {
    var doc = this;
    counter.findByIdAndUpdate({_id: 'entityId'}, {$inc: { seq: 1} }, {new: true, upsert: true}).then(function(count) {
        console.log("...count: "+JSON.stringify(count));
        doc.stateId = count.seq;
        next();
    })
    .catch(function(error) {
        console.error("counter error-> : "+error);
        throw error;
    });
});

module.exports = new mongoose.model('State' , stateModal)