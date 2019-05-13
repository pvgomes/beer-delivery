const mongolib = require('mongoose');
const config = require('config');
mongolib.connect(config.get('db'));
mongolib.set('useCreateIndex', true);
mongolib.set('useNewUrlParser', true);

const Schema = mongolib.Schema;
const pdvSchema = new Schema({
    address: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true,
            index: '2dsphere'
        },
    },
    coverageArea: {
        type: {
            type: String,
            enum: ['MultiPolygon'],
            required: true
        },
        coordinates: {
            type: [[[[Number]]]],
            required: true
        }
    },
    tradingName: {
      type: String
    },
    ownerName: {
      type: String
    },
    document: {
        type: String,
        unique: true
    }
});


var Pdv = mongolib.model('pdv', pdvSchema);
exports.Pdv = Pdv;
