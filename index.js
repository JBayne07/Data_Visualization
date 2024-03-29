const express = require('express');
const fs = require("fs");
const https = require("https");
const mongoose = require('mongoose');
const routes = require('./routes/routes');
require('dotenv').config();

const app = express();

const port = process.env.PORT;

mongoose.connect(process.env.DB).then(() => {
    console.log('Database Connected\n');
})

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Credentials', '*');
    next();
});

app.use('/api', routes);

https.createServer(
    {
        key: fs.readFileSync("server.key"),
        cert: fs.readFileSync("server.cert"),
    }, 
    app
).listen(port, () => {
        console.log("Serving on port " + port);
    }
);

// app.listen(Number(port) + 1, () => {
//     console.log("Serving on port " + (Number(port) + 1));
// })