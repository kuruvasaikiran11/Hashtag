// const mongoose = require("mongoose");
// const express = require("express");
// const cors = require('cors');
// const app = express();
// const userRoutes = require('./routes/user.route');
// const imageRoutes = require('./routes/image.route');

// const path = require('path');

// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



// app.use(cors({
//     origin: true, // Allow this origin
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow these methods
//     credentials: true, // Allow cookies to be sent
//     optionsSuccessStatus: 204
//   }));

// app.use(express.json());
// app.use(express.urlencoded({extended:true}));
// app.get('/', (req, res)=>{
//     return res.status(200).json({
//         message: "Welcome to first Node app"
//     })
// })

// app.use('/auth', userRoutes);
// app.use('/images', imageRoutes);

// mongoose.connect("mongodb+srv://kuruvasaikiran11:Kurnool123@cluster0.z1ij6vp.mongodb.net/?retryWrites=true&w=majority")
// .then(()=>{
//     app.listen(5001, ()=>{
//         console.log("Connected to server at 5001");
//     });
// })
// .catch(err=>console.log("Couldn't connect to db"+err));

const cors = require('cors');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user.route');
const imageRoutes = require('./routes/image.route');

const app = express();

// app.use(cors());
app.use(cors({
    origin: true, // Allow this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow these methods
    credentials: true, // Allow cookies to be sent
    optionsSuccessStatus: 204
  }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/auth', userRoutes);
app.use('/images', imageRoutes);

mongoose.connect("mongodb+srv://kuruvasaikiran11:Kurnool123@cluster0.z1ij6vp.mongodb.net/?retryWrites=true&w=majority")
    .then(() => {
        app.listen(5001, () => {
            console.log("Connected to server at 5001");
        });
    })
    .catch(err => console.log("Couldn't connect to db" + err));
