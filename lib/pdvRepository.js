const db = require('./storage/mongoDB');
const duplicated_code = 11000;

module.exports.duplicatedCode = function() {
  return duplicated_code;
}

module.exports.findByHash = function(hash) {
      return new Promise((resolve, reject) => {
          db.Pdv.findOne({_id: hash}).exec(function(err, pdv) {
            return (err ? reject(err) : resolve(pdv));
          });
      });
}

module.exports.findByDocument = function(document) {
    return new Promise((resolve, reject) => {
        db.Pdv.findOne({document: document}).exec(function(err, pdv) {
          return (err ? reject(err) : resolve(pdv));
        });
    });
}

module.exports.findAll = function() {
  return new Promise((resolve, reject) => {
    db.Pdv.find({}, function(err, pdvs) {
     return (err ? reject(err) : resolve(pdvs));
    });
  });
}

module.exports.search = function(lng, lat) {
    return new Promise((resolve, reject) => {
        let near = {
            type: 'Point',
            coordinates: [lng, lat]
        };

        db.Pdv.aggregate(
          [
              {
                '$geoNear': {
                    'near': near,
                    'maxDistance': 10000,
                    'distanceField': 'distance',
                    'num': 50,
                    'spherical': true
                }
              },
              {
                '$match': {
                    'coverageArea': {
                        '$geoIntersects': { '$geometry': near }
                    }
                }
              },
              {
                '$limit': 1
              },
              {
                '$project': {
                    'coverageArea': 0,
                    'document': 0,
                    'id': 0,
                }
              }
          ]
        ).exec(function(err, pdv) {
          console.log(err);
          return (err ? reject(err) : resolve(pdv));
        });
    });
}

module.exports.add = function(pdv) {
    return new Promise((resolve, reject) => {
        db.Pdv.create(pdv, (err, pdv) => {
          return (err ? reject(err) : resolve(pdv));
        });
    });
}
