const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Users = require('./models/Users.js')
const bcrypt = require('bcrypt');
const userController = require('./controllers/users_controller.js')
const db = mongoose.connection;
const cors = require('cors');
require('dotenv').config()
const Samples = require('./models/sampleSchema.js')


const PORT = process.env.PORT || 3003;
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI);

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: false }))

// make sure that other middlewear runs first
app.use('/', userController)


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});


// Get
app.get('/', (req, res)=>{
    Samples.find({}, (err, foundSamples)=>{
        res.json(foundSamples);
    });
});

// Post
app.post('/', (req, res) => {
    Samples.create(req.body, (err, createdSamples) => {
        res.json(createdSamples);
    })
})

// Delete
app.delete('/:id', (req, res) => {
    Samples.findByIdAndRemove(req.params.id, (err, deletedSamples) => {
        res.json(deletedSamples)
    } )
})

// Edit
app.put('/:id', (req, res)=>{
    Samples.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedSamples)=>{
        res.json(updatedSamples);
    });
});

// // Users create
app.post('/register', (req, res) => {
    Users.create(req.body, (err, createdUsers) => {
        res.json(createdUsers);
    })
})



/// LISTENING ////

app.listen(3000, () => {
    console.log('listening on 3000 homie...');
})
    
// mongoose.connect('mongodb://localhost:27017/poly')
// mongoose.connection.once('open', ()=>{
//     console.log('connected to mongod...');
// });