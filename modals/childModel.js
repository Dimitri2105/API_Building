const mongoose = require("mongoose");

const counter = require("./counterModel");

const Schema = mongoose.Schema;

const childModal = new Schema({
  id: {
    type: Number,
  },

  name: {
    type: String,
    required: true,
  },
  sex: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  father_name: {
    type: String,
    required: true,
  },
  mother_name: {
    type: String,
    required: true,
  },
  district_id: {
    type: Number,
    ref: "District",
    required: true,
  },
  isActive : {
    type : String,
  }

});

childModal.pre('save', function(next) {
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

module.exports = new mongoose.model("Child", childModal);
