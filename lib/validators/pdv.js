const Joi = require('joi');

class Pdv {
  validate(pdv) {
    const schema = {
      tradingName: Joi.string().required(),
      ownerName: Joi.string().required(),
      document: Joi.string().required(),
      coverageArea: Joi.object().required().keys({
        type: Joi.string().required(),
        coordinates: Joi.array().required()
      }).with('type', 'coordinates'),
      address: Joi.object().required().keys({
        type: Joi.string().required(),
        coordinates: Joi.array().required()
      }).with('type', 'coordinates')
    };
    return Joi.validate(pdv, schema);
  }
}

module.exports = Pdv;
