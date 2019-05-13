const PdvService = require('../lib/pdvService');
const repository = require('../lib/pdvRepository');

describe('pdv service', () => {

  it('should get a list of pdvs', () => {
    repository.findAll = jest.fn().mockResolvedValue([
      {
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
                            -49.35334,
                            -25.45065
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
    },
      {
        "address": {
            "type": "Point",
            "coordinates": [
                -38.59826,
                -3.774186
            ]
        },
        "coverageArea": {
            "coordinates": [
                [
                    [
                        [
                            -38.6577,
                            -3.7753
                        ],
                        [
                            -38.6577,
                            -3.7753
                        ]
                    ]
                ]
            ],
            "type": "MultiPolygon"
        },
        "_id": "5cd991d7e8b4a5bffe4dcbca",
        "id": "3",
        "tradingName": "Adega Sao Paulo",
        "ownerName": "Pedro Silva",
        "document": "04666182390"
    }
    ]);

    const pdvService = new PdvService();
    const response = pdvService.getAll();
    expect(response).toBeTruthy();
  });

});
