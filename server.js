const express = require('express');
const app = express();
const path = require('path');
const request = require('request');
const fs = require('fs');
const config = require('./config');
const { log } = require('console');
const port = config.PORT;
const api_key = config.API_KEY;

app.use('/static', express.static(path.resolve(__dirname, 'public', 'static')));

app.get('/*', (req, res) => {

  const earthDate = config.DATE;
  const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${earthDate}&api_key=${api_key}`;
  request.get({
    url: url,
    json: true,
    headers: { 'User-Agent': 'request' }
  }, (err, response, data) => {
    if (err) {
      console.log('Error:', err);
    } else if (response.statusCode !== 200) {
      console.log('Status:', response.statusCode);
    } else {
      const newData = JSON.stringify(data);
      fs.writeFile(`./public/static/data/data.json`, newData, (err) => {
        if (err) {
          console.log('File write error: ', err);
          res.status(500).send('File write error');
          return;
        } else {
          console.log('Data enregistree dans le fichier: ', `./public/static/data/data.json`);
          res.send('success');
        }
      });
    }
  });

  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.listen(port, () => console.log('Server running on port ' + port + '...'));