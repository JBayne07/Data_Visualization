const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NumSchema = new Schema({
    value: Number,
    colour: String
});

const Num = mongoose.model('Number', NumSchema);

module.exports = Num;