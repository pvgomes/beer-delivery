const helmet = require('helmet');
const Joi = require('joi');
const pdvs = require('./lib/routes/pdvs');
const search = require('./lib/routes/search');
const healthcheck = require('./lib/routes/healthcheck');
const express = require('express');
const app = express();
const config = require('config');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use('/', healthcheck);
app.use('/api/pdvs', pdvs);
app.use('/api/search', search);

app.use(function(req, res) {
  res.status(404)
    .send('Not found');
});


const port = config.get('server_port') || 5000;

const server = app.listen(port);

module.exports = server;
