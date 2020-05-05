const express = require('express');
const Datastore = require('nedb');
const app = express();
const port = process.env.PORT || 80;
require('dotenv').config();
app.listen(port, () => console.log('listening at ' + port));
app.use(express.static('Public'));
app.use(express.json());

const database = new Datastore('database.db');
database.loadDatabase();

app.get('/api', (request, response) => {
  database.find({}, (err, data) => {
      response.json(data);
      if(err) {
        response.end();
        return;
      }
  });
});

app.post('/api', (request, response) => {
  console.log(request.body);
  const data = request.body;
  const timestamp = Date.now();
  data.timestamp = timestamp;
  database.insert(data);
  response.json({
    successful: 'true',
    request: request.body
  });
});
