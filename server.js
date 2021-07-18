const { readFileSync, writeFileSync } = require('fs');

const express = require('express');
const app = express();
const path = require('path');
const port = 5000;
const site = 'http://localhost:5000/';


app.use(express.static(path.join(__dirname)));

app.use('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'HTML', 'text.html'));
});


app.listen(port, () => console.log(site));
