const express = require('express');
const app = express();
const path = require('path');
const request = require('request');
const fs = require('fs');
const config = require('./config');
const port = config.PORT;

app.use('/static', express.static(path.resolve(__dirname, 'public', 'static')));

app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.listen(port, () => console.log('Server running...'));