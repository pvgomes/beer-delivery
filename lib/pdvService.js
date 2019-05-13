const PdvValidator = require('./validators/pdv');
const SearchValidator = require('./validators/search');
const PdvRepository = require('./pdvRepository');

class PdvService {

  getAll() {
    return function(req, res) {
      const pdvRepository = new PdvRepository();
      pdvRepository.findAll()
          .then( (pdvs) => {
              return (!pdvs ? res.status(404).end() : res.status(200).json(pdvs).end());
          })
          .catch(err=> {
              return res.status(500).end();
          });
    }
  }

  getByHash() {
      return function(req, res) {
        const hash = req.params.hash;

        const pdvRepository = new PdvRepository();
        pdvRepository.findByHash(hash)
            .then( (pdv) => {
                return (
                  !pdv ?
                  res.status(404).end() :
                  res.status(200).json(pdv).end()
                );
            })
            .catch(err=> {
                return res.status(500).end();
            });
      };
  }

  search() {
    return function(req, res) {
      const searchValidator = new SearchValidator();
      const { error } = searchValidator.validate(req.query);
      if (error) return res.status(400).send(error.details);

      const pdvRepository = new PdvRepository();
      const lng = parseFloat(req.query.lng);
      const lat = parseFloat(req.query.lat);

      pdvRepository.search(lng, lat)
          .then( (pdv) => {
              if (pdv.length == 0) {
                return res.status(200)
                          .json({message: "no near PDV found :(, drink some water"})
                          .end();
              }
              return res.status(200).json(pdv).end();
          })
          .catch(err => {
            console.log(err);
            return (
              err.code == 2 ?
                res.status(400).send(err.errmsg).end() :
                res.status(500).end()
            );
          });

    }
  }

  add() {
      return function(req, res) {
        const pdvValidator = new PdvValidator();
        const { error } = pdvValidator.validate(req.body);
        if (error) return res.status(400).send(error.details);

        const pdvRepository = new PdvRepository();
        pdvRepository.add(req.body)
          .then((pdvCreated) => {
              res.location(
                req.route.path + '/' + pdvCreated._id
              );
              return res.status(201)
                .json(pdvCreated)
                .end();
          })
          .catch((error) => {
              if (error) {
                  if (error.code == pdvRepository.duplicatedCode()) {
                      return res.status(400)
                                .json({message: "PDV with this document already registered"})
                                .send()
                                .end();
                  }
                  return res.status(500)
                            .end();
              }
          });
      }
  }

}

module.exports = PdvService;
