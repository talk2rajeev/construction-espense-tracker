const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// interface Vendor {
//     name: string,
//     address: string,
//     contact: number
// }

const vendorSchema = new Schema({
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

const Vendor = mongoose.model('vendor', vendorSchema);
module.exports = Vendor;
