const Worker = require('../models/worker');

const createWorker = (req, res) => {
    console.log('ReqBody ', req.body);

    const worker = new Worker(req.body);
    worker.save().then((response) => {
        res.send(response);
    }).catch((err) => {
        res.status(400);
        console.log('ERR ' + err);
        res.statusMessage = err;
        res.send({ message: 'Failed to create worker' });
    });
}

const getWorkerList = (req, res) => {
    Worker.find().then((result) => {
        res.send(result);
    }).catch((err) => console.log('err in getting Worker list ', err));
}

const getWorkerById = (req, res) => {
    const id = req.params.id;
    Worker.findById(id).then((result) => {
        res.send(result);
    }).catch((err) => {
        const errArr = err.split('at');
        res.status(400)
        res.statusMessage = errArr[0];
        res.send({ message: 'Failed to get Worker' });
    });
}

const updateWorker = (req, res) => {
    const id = req.body.id;
    console.log('req.body >>>> ',  req.body);
    const update = req.body;
    delete update.id;
    Worker.findByIdAndUpdate({ _id: id}, {...update}).then((result) => {
        res.send(result);
    }).catch((err) => console.log('err in updating vendor By ID ', err));
}

const deleteWorker = (req, res) => {
    const id = req.body.id;
    Worker.findByIdAndDelete(id).then((result) => {
        res.send(result);
    }).catch((err) => console.log('err in deleting Worker By ID ', err));
}

module.exports = {
    createWorker,
    getWorkerList,
    getWorkerById,
    updateWorker,
    deleteWorker,
}