'use strict';

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port =  process.env.PORT || 3000;
const bodyParser = require('body-parser');

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(bodyParser.json());
// routes
app.use('/profile', require('./routes/profile')());
app.use('/comment', require('./routes/comment')());
app.use('/user', require('./routes/user')());

// start server
const intialDbConnection = async () => {
    try {
      await mongoose.connect("mongodb://localhost:27017/boo_assignment")
      console.log("db connected")
    }
    catch (error) {
      console.error(error);
    }
  }
  
intialDbConnection()
.then(() => console.log('connected'))
const server = app.listen(port);
console.log('Express started. Listening on %s', port);
