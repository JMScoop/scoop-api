// rides-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const rides = new Schema({
    driver: {
      id: {
        type: string,
        // required: true
      },
      first_name: {
        type: String,
        // required: true
      },
      last_name: {
        type: String,
        // required: true
      },
      car: {
        seats: {
          type: Number,
          // required: true,
          min: 1
        },
        description: {
          type: String,
          // required: true
        }
      }
    },
    departs: {
      type: Date,
      required: 'You must specify your departure date.'
    },
    origin: {
      type: String,
      required: 'You must specify from where you are leaving.'
    },
    destination: {
      type: String,
      required: 'You must specify to where you are going.'
    },
    notes: String,
    seats_open : {
      type: Number,
      min: 0
    },
    passengers: [{

      first_name: {
        type: String,
        // required: true
      },
      last_name: {
        type: String,
        // required: true
      }
    }]
  }, {
    timestamps: true, // adds createdAt and updatedAt fields automatically
    minimize: false   // will make sure all properties exist, even if null
  });

  return mongooseClient.model('rides', rides);
};
