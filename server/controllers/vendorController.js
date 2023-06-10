const Vendor = require('../models/vendor.ts');

const createVendor = (req, res) => {
    console.log('ReqBody ', req.body);

    const vendor = new Vendor(req.body);
    vendor.save().then((response) => {
        res.send(response);
    }).catch((err) => {
        res.status(400);
        console.log('ERR ' + err);
        res.statusMessage = err;
        res.send({ message: 'Failed to create vendor' });
    });
}

const getVendorList = (req, res) => {
    Vendor.find().then((result) => {
        res.send(result);
    }).catch((err) => console.log('err in getting vendor list ', err));
}

const getVendorById = (req, res) => {
    const id = req.params.id;
    Vendor.findById(id).then((result) => {
        res.send(result);
    }).catch((err) => {
        const errArr = err.split('at');
        res.status(400)
        res.statusMessage = errArr[0];
        res.send({ message: 'Failed to get vendor' });
    });
}

const updateVendor = (req, res) => {
    const id = req.body.id;
    console.log('req.body >>>> ',  req.body);
    const update = req.body;
    delete update.id;
    Vendor.findByIdAndUpdate({ _id: id}, {...update}).then((result) => {
        res.send(result);
    }).catch((err) => console.log('err in updating vendor By ID ', err));
}

const deleteVendor = (req, res) => {
    const id = req.body.id;
    Vendor.findByIdAndDelete(id).then((result) => {
        res.send(result);
    }).catch((err) => console.log('err in deleting vendor By ID ', err));
}

module.exports = {
    createVendor,
    getVendorList,
    getVendorById,
    updateVendor,
    deleteVendor,
}