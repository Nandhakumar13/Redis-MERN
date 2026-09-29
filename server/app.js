const express = require('express');
const jsonParser = require('jsonparser');
const prodRoute = require('./route/productRoute');


const app = express();


// app.use(jsonParser());
app.use(express.json());

app.use('/api/v1/', prodRoute);


module.exports = app;