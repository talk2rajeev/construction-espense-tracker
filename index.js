//uid: tracker_user
//pwd: tracker_user123
//url: mongodb+srv://tracker_user:tracker_user123@cluster0.ovjaj.mongodb.net/expensetracker?retryWrites=true&w=majority
const express = require('express');
var cors = require('cors')
const path = require('path');
const bodyParser= require('body-parser');
const morgan = require('morgan'); //Logger
const mongoose = require('mongoose');

const vendorRoute = require('./server/routes/vendorRoute');
const authRoute = require('./server/routes/authRoute');
const expenseRoute = require('./server/routes/expenseRoute');
const workerRoute = require('./server/routes/workerRoute');

const PORT = process.env.PORT || 5000

const app = express();

// Make sure you place body-parser before your CRUD handlers!
//app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json())

//const DBURI = 'mongodb+srv://tracker_user:tracker_user123@cluster0.ovjaj.mongodb.net/expensetracker?retryWrites=true&w=majority';
const DBURI = 'mongodb+srv://tracker_user:tracker_user123@cluster0.ovjaj.mongodb.net/expensetracker?retryWrites=true&w=majority';
//const DBURI = 'mongodb://talk2rajeev:tridha8741@ds157064.mlab.com:57064/tracker';
mongoose.connect(DBURI, { useNewUrlParser: true, useUnifiedTopology: true }).then((res) => {
  app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
}).catch((err) => {
  console.log('error in connection ', err);
})


// app.use(cors);
// app.options('*', cors);

app.options('*', cors())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, Authorization, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("access-control-allow-methods", "GET,POST,PUT,PATCH,DELETE,HEAD");
  next();
});


//app.use(bodyParser.json())
//app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, 'build')))
.use(morgan('dev'))
//.set('views', path.join(__dirname, 'build'))
//.set('view engine', 'ejs')
.get('/', (req, res) => res.render('index.html'))

app.use('/api', vendorRoute);
app.use('/api', authRoute);
app.use('/api', expenseRoute);
app.use('/api', workerRoute);





