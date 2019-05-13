const PdvService = require('../pdvService');
const pdvService = new PdvService();
const express = require('express');
const router = express.Router();

router.route('/')
  .get(pdvService.getAll())
  .post(pdvService.add());

router.route("/:hash")
  .get(pdvService.getByHash());

module.exports = router;
