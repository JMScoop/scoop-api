const rides = require('./rides/rides.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(rides);
};
