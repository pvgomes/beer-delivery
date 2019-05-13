const helmet = require('helmet');
const Joi = require('joi');
const pdvs = require('./lib/routes/pdvs');
const search = require('./lib/routes/search');
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use('/api/pdvs', pdvs);
app.use('/api/search', search);

app.get('/', function(req, res) {
  res.json({message: "healthcheck:ok"})
     .status(200)
     .send()
     .end();
});

app.use(function(req, res) {
  res.status(404)
    .send('Not found');
});


const port = process.env
  .PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}...`));
