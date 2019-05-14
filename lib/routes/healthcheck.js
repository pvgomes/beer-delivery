const PdvService = require('../pdvService');
const pdvService = new PdvService();
const express = require('express');
const router = express.Router();
const db = require('../storage/mongoDB');

router.get('/', function(req, res) {
  res.json({message: "Lets drink a beer"})
     .status(200)
     .send()
     .end();
});

router.get('/healthcheck', function(req, res) {
  if (db.healthcheck()) {
    return res.json({message: "healthcheck:ok"})
       .status(200)
       .send()
       .end();
  }
  res.status(503).end();
});

module.exports = router;
