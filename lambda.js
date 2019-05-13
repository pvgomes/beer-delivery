'use strict';
const app = require('./app')

module.exports.bootstrap = async (event, context) => {

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'WIP, handle app.js',
      input: event,
    }),
  };

};
