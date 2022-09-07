require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const router = require('./api');
// const path = require('path');



// MIDDLEWARE AND API ROUTER
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/api', router);


// ERROR HANDLING
router.use((error, req, res, next) => {
  res.send({
    error: error.message,
    name: error.name,
    message: error.message,
  });
});

module.exports = { app }