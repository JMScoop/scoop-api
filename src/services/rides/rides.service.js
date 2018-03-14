// Initializes the `rides` service on path `/rides`
const createService = require('feathers-mongoose');
const createModel = require('../../models/rides.model');
const hooks = require('./rides.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'rides',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/rides', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('rides');

  service.hooks(hooks);
};
