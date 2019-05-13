const db = require('./storage/mongoDB');
const duplicated_code = 11000;
class PdvRepository {

    duplicatedCode() {
      return duplicated_code;
    }

    findByHash(hash) {
        return new Promise((resolve, reject) => {
            db.Pdv.findOne({_id: hash}).exec(function(err, pdv) {
              return (err ? reject(err) : resolve(pdv));
            });
        });
    }

    findByDocument(document) {
        return new Promise((resolve, reject) => {
            db.Pdv.findOne({document: document}).exec(function(err, pdv) {
              return (err ? reject(err) : resolve(pdv));
            });
        });
    }

    findAll() {
      return new Promise((resolve, reject) => {
        db.Pdv.find({}, function(err, pdvs) {
         return (err ? reject(err) : resolve(pdvs));
        });
      });
    }

    search(lng, lat) {
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

    add(pdv) {
        return new Promise((resolve, reject) => {
            db.Pdv.create(pdv, (err, pdv) => {
              return (err ? reject(err) : resolve(pdv));
            });
        });
    }
}

module.exports = PdvRepository;
