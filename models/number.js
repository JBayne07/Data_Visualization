const mongoose = require('mongoose');
const Schema = mongoose.Schema()

const NumSchema = new Schema({
    value: Number
})

const Num = mongoose.model('Number', NumSchema);

module.exports = Num;