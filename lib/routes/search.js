const PdvService = require('../pdvService');
const pdvService = new PdvService();
const express = require('express');
const router = express.Router();

router.route('/')
  .get(pdvService.search());

module.exports = router;
