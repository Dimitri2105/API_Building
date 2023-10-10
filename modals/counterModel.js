const mongoose = require('mongoose')

const Schema = mongoose.Schema

const setupConnection = require('../connect')

var CounterSchema = new Schema({
    _id: {type: String, required: true},
    seq: { type: Number, default: 0 }
});

var counter = new  mongoose.model('counter', CounterSchema);

module.exports = counter