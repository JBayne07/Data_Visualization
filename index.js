const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
require('dotenv').config();

const app = express();

const port = process.env.PORT;

mongoose.connect(process.env.DB).then(() => {
    console.log('Database Connected')
})

app.use('/api', routes);

app.listen(port, () => {
    console.log("Serving on port " + port);
})