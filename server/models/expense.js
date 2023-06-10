const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExoenseSchema = new Schema({
    exp_name: {
        type: String,
        required: true,
    },
    exp_amount: {
        type: Number,
        required: true,
    },
    no_of_days: {
        type: Number,
        required: true,
    },
    vendor_id: {
        type: String,
        required: false,
    },
    vendor_name: {
        type: String,
        required: false,
    },
    note: {
        type: String,
        required: false,
    },
    exp_type: {
        type: String,
        required: false,
    },
    exp_date: {
        type: Date
    }
}, {timestapms: true});

const Expense = mongoose.model('expense', ExoenseSchema);
module.exports = Expense;
