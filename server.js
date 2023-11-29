const express = require('express');
const app = express();
const path = require('path');

app.use('/static', express.static(path.resolve(__dirname, 'public', 'static')));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.listen(8080, () => console.log('Server running...'));