const Expense = require('../models/expense');

const createExpense = (req, res) => {
    console.log('ReqBody ', req.body);

    const expense = new Expense(req.body);
    expense.save().then((response) => {
        res.send(response);
    }).catch((err) => {
        res.status(400);
        console.log('ERR ' + err);
        res.statusMessage = err;
        res.send({ message: 'Failed to create Expense' });
    });
}

const getExpenseList = (req, res) => {
    Expense.find().sort({ exp_date: 'asc'}).then((result) => {
        res.send(result);
    }).catch((err) => console.log('err in getting Expense list ', err));
}

const getExpenseById = (req, res) => {
    const id = req.params.id;
    Expense.findById(id).then((result) => {
        res.send(result);
    }).catch((err) => {
        const errArr = err.split('at');
        res.status(400)
        res.statusMessage = errArr[0];
        res.send({ message: 'Failed to get vendor' });
    });
}

const deleteExpense = (req, res) => {
    const id = req.body.id;
    Expense.findByIdAndDelete(id).then((result) => {
        res.send(result);
    }).catch((err) => console.log('err in deleting Expense By ID ', err));
}

const updateeExpense = (req, res) => {
    const id = req.body.id;
    console.log('req.body >>>> ',  req.body);
    const filter = { id: req.body.id};
    const update = req.body;
    delete update.id;
    Expense.findByIdAndUpdate({ _id: id}, {...update}).then((result) => {
        res.send(result);
    }).catch((err) => console.log('err in updating Expense By ID ', err));
}

const expensebydate = (req, res) => {
    const startDate = new Date(req.body.startDate);
    const endDate = new Date(req.body.endDate);

    let newReq = {...req.body};
    
    console.log('newReq >>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ', newReq);

    const filter = {};
    if (req.body.exp_type) {
        filter['exp_type'] = req.body.exp_type;
    }
    if (req.body.vendor_id) {
        filter['vendor_id'] = req.body.vendor_id;
    }

    const exp_name = req.body.exp_name ? req.body.exp_name : undefinded;

    if (req.body.endDate) {
        Expense.find({exp_date: {$gte: startDate, $lt: endDate}, ...filter}).sort({ exp_date: 'asc'}).then((result) => {
            res.send(result);
        }).catch((err) => {
            res.status(400);
            res.send({ message: 'Failed to get vendor by date' });
        });
    } else {
        Expense.find({...filter}).sort({ exp_date: 'asc'}).then((result) => {
            if (exp_name) {
                const list = result.filter(item=>item.exp_name.toUpperCase().includes(exp_name.toUpperCase()));
                res.send(list);
            } else {
                res.send(result);
            }
        }).catch((err) => {
            res.status(400);
            res.send({ message: 'Failed to get vendor by date' });
        });
    }
}

const expenseFilter = (req, res) => {
    const { exp_vendorId, exp_tag } = req.body;
    console.log(req.body);
    Expense.find({ ...req.body }).then((result) => {
        res.send(result);
    }).catch((err) => console.log('err in updating Expense By ID ', err));
    // if (exp_vendorId && exp_tag) {
    //     Expense.find({ exp_vendorId, exp_tag }).then((result) => {
    //         res.send(result);
    //     }).catch((err) => console.log('err in updating Expense By ID ', err));
    // } else if (exp_vendorId && !exp_tag) {
    //     Expense.find({ exp_vendorId }).then((result) => {
    //         res.send(result);
    //     }).catch((err) => console.log('err in updating Expense By ID ', err));
    // } else if (!exp_vendorId && exp_tag) {
    //     Expense.find({ exp_tag }).then((result) => {
    //         res.send(result);
    //     }).catch((err) => console.log('err in updating Expense By ID ', err));
    // } else {
    //     Expense.find().then((result) => {
    //         res.send(result);
    //     }).catch((err) => console.log('err in updating Expense By ID ', err));
    // }
}


module.exports = {
    createExpense,
    getExpenseList,
    getExpenseById,
    deleteExpense,
    updateeExpense,
    expensebydate,
    expenseFilter,
}

