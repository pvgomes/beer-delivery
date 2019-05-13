const PdvService = require('../lib/pdvService');
const PdvRepository = require('../lib/pdvRepository');
jest.mock('../lib/pdvRepository');

describe('pdv service', () => {

  beforeAll(() => {
   PdvRepository.mockImplementation(() => {
     return {
       findAll: () => {
            return [{
                   "address": {
                       "type": "Point",
                       "coordinates": [
                           -49.33425,
                           -25.380995
                       ]
                   },
                   "coverageArea": {
                       "coordinates": [
                           [
                               [
                                   [
                                       -49.36299,
                                       -25.4515
                                   ],
                                   [
                                       -49.36299,
                                       -25.4515
                                   ]
                               ]
                           ]
                       ],
                       "type": "MultiPolygon"
                   },
                   "_id": "5cd991d7e8b4a5bffe4dcbc9",
                   "id": "2",
                   "tradingName": "Adega Pinheiros",
                   "ownerName": "Ze da Silva",
                   "document": "04.433.714/0001-44"
          }];
       },
     };
   });
 });

  it('should get a list of pdvs', () => {
    const pdvService = new PdvService();
    pdvs = pdvService.getAll();
    expect(pdvs).toBeTruthy();
  });

});
