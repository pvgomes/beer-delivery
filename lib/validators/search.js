const Joi = require('joi');

class Search {
  validate(search) {
    const schema = {
      lng: Joi.number().required(),
      lat: Joi.number().required()
    };
    return Joi.validate(search, schema);
  }
}

module.exports = Search;
