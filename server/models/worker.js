const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workerSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: false,
    },
    contact: {
        type: Number,
        required: false,
    }
});
//}, {timestapms: true})

const Worker = mongoose.model('worker', workerSchema);
module.exports = Worker;
