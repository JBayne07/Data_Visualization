require('dotenv').config();
const express = require('express');
const Mongoose = require('mongoose');
const routes = require('./routes/routes');

const app = express();

const port = process.env.PORT;

Mongoose.connect(process.env.DB).then(() => {
    console.log('Database Connected')
})

app.use('/api', routes);

app.listen(port, () => {
    console.log("Serving on port " + port);
})