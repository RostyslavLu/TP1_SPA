const express = require('express');
const app = express();
const path = require('path');
const request = require('request');
const fs = require('fs');
const config = require('./config');
const port = config.PORT;

app.use('/static', express.static(path.resolve(__dirname, 'public', 'static')));

app.get('/*', (req, res) => {
    const url = 'https://www.donneesquebec.ca/recherche/dataset/428fc380-dff4-4bf7-913d-3d719ecdff00/resource/97ff4670-c522-497a-89c8-ee6891831af8/download/oeuvresmac.json';
    request.get({
        url: url,
        json: true,
        headers: {'User-Agent': 'request'}
      }, (err, response, data) => {
        if (err) {
          console.log('Error:', err);
        } else if (response.statusCode !== 200) {
          console.log('Status:', response.statusCode);
        } else {

          const newData = JSON.stringify(data);
          fs.writeFile(`./public/static/data/data.json`, newData, (err) => {
            if (err){
              console.log('File write error: ', err);
              res.status(500).send('File write error'); 
            } else{
              console.log('Data enregistree dans le fichier: ', `./public/static/data/data.json`);
              res.send('success');
            }
          });
        }
    });
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.listen(port, () => console.log('Server running...'));