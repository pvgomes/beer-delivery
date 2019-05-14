const request = require('supertest');
const {Pdv} = require('../../lib/storage/mongoDB')
const mongoose = require('mongoose');

let server;

describe('/api/pdvs', () => {
  beforeEach(() => { server = require('../../app'); });
  afterEach(async () => {
    server.close();
    await Pdv.deleteMany({});
  });

  describe('GET /', () => {
    it('should return all pdvs', async () => {
      const pdvs = [
        {
           "address":{
              "type":"Point",
              "coordinates":[
                 -49.33425,
                 -25.380995
              ]
           },
           "coverageArea":{
              "coordinates":[
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
              "type":"MultiPolygon"
           },
           "_id":"5cdc1f97fd232658a3c1653f",
           "id":"2",
           "tradingName":"Adega Pinheiros",
           "ownerName":"Ze da Silva",
           "document":"04.433.714/0001-44"
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
                            -38.63212,
                            -3.81418
                        ]
                    ]
                ]
            ],
            "type": "MultiPolygon"
        },
        "_id": "5cdc1f97fd232658a3c16540",
        "id": "3",
        "tradingName": "Adega Sao Paulo",
        "ownerName": "Pedro Silva",
        "document": "04666182390"
      }
      ];
      await Pdv.collection.insertMany(pdvs);

      const res = await request(server).get('/api/pdvs');

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some(pdv => pdv.document === '04.433.714/0001-44')).toBeTruthy();
      expect(res.body.some(pdv => pdv.document === '04666182390')).toBeTruthy();
    });

    it('should get pdv by hash', async () => {

      const pdv = new Pdv({
         "address":{
            "type":"Point",
            "coordinates":[
               -49.33425,
               -25.380995
            ]
         },
         "coverageArea":{
            "coordinates":[
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
            "type":"MultiPolygon"
         },
         "tradingName":"Adega Pinheiros",
         "ownerName":"Ze da Silva",
         "document":"04.433.714/0001-44"
      });
      await pdv.save();

      const res = await request(server).get('/api/pdvs/' + pdv._id);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('tradingName', pdv.tradingName);
    });

    it('should return 404 if no pdv with the given id exists', async () => {
      const id = mongoose.Types.ObjectId();
      const res = await request(server).get('/api/pdvs/' + id);
      expect(res.status).toBe(404);
    });

    it('should return near pdv by search', async () => {
      const pdvs = [
        {
           "address":{
              "type":"Point",
              "coordinates":[
                 -49.33425,
                 -25.380995
              ]
           },
           "coverageArea":{
              "coordinates":[
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
              "type":"MultiPolygon"
           },
           "id":"2",
           "tradingName":"Adega Pinheiros",
           "ownerName":"Ze da Silva",
           "document":"04.433.714/0001-44"
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
                              -38.63212,
                              -3.81418
                          ]
                      ]
                  ]
              ],
              "type": "MultiPolygon"
          },
          "id": "3",
          "tradingName": "Adega Sao Paulo",
          "ownerName": "Pedro Silva",
          "document": "04666182390"
        },
        {
            "address": {
                "type": "Point",
                "coordinates": [
                    -46.474983,
                    -23.610245
                ]
            },
            "coverageArea": {
                "coordinates": [
                    [
                        [
                            [
                                -46.5292,
                                -23.58735
                            ],
                            [
                                -46.53503,
                                -23.5975
                            ],
                            [
                                -46.5219,
                                -23.61527
                            ],
                            [
                                -46.5139,
                                -23.62034
                            ],
                            [
                                -46.51087,
                                -23.62479
                            ],
                            [
                                -46.50396,
                                -23.62738
                            ],
                            [
                                -46.50336,
                                -23.63424
                            ],
                            [
                                -46.49512,
                                -23.64432
                            ],
                            [
                                -46.4886,
                                -23.647
                            ],
                            [
                                -46.4686,
                                -23.65435
                            ],
                            [
                                -46.46036,
                                -23.65006
                            ],
                            [
                                -46.4559,
                                -23.64043
                            ],
                            [
                                -46.45143,
                                -23.63611
                            ],
                            [
                                -46.4504,
                                -23.62278
                            ],
                            [
                                -46.44233,
                                -23.61627
                            ],
                            [
                                -46.43942,
                                -23.61255
                            ],
                            [
                                -46.44508,
                                -23.59466
                            ],
                            [
                                -46.4662,
                                -23.59482
                            ],
                            [
                                -46.49057,
                                -23.58161
                            ],
                            [
                                -46.49443,
                                -23.57901
                            ],
                            [
                                -46.50018,
                                -23.5783
                            ],
                            [
                                -46.50424,
                                -23.57331
                            ],
                            [
                                -46.52023,
                                -23.5761
                            ],
                            [
                                -46.5292,
                                -23.58735
                            ]
                        ]
                    ]
                ],
                "type": "MultiPolygon"
            },
            "id": "15",
            "tradingName": "Emporio da Cerveja",
            "ownerName": "Joao Maradona",
            "document": "11.863.940/0001-20"
        }
      ];
      await Pdv.collection.insertMany(pdvs);

      const res = await request(server).get('/api/search?lng=-46.474983&lat=-23.610245');

      expect(res.status).toBe(200);
    });

    it('should return 404 when not found a near pdv by search', async () => {
      const pdvs = [
        {
           "address":{
              "type":"Point",
              "coordinates":[
                 -49.33425,
                 -25.380995
              ]
           },
           "coverageArea":{
              "coordinates":[
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
              "type":"MultiPolygon"
           },
           "id":"2",
           "tradingName":"Adega Pinheiros",
           "ownerName":"Ze da Silva",
           "document":"04.433.714/0001-44"
        }
      ];
      await Pdv.collection.insertMany(pdvs);

      const res = await request(server).get('/api/search?lng=-61.908053&lat=-15.358356');

      expect(res.status).toBe(404);
    });
  });

  describe('POST /',() => {
    it('should return 201 when pdv is complete', async () => {
      const res = await request(server)
        .post('/api/pdvs')
        .send({
            	"tradingName": "Adega do Java",
            	"ownerName": "Joaquina Jalenta",
            	"document": "04.210.017/0001-09",
            	"coverageArea": {
            	 "type": "MultiPolygon",
            	 "coordinates": [
            	    [
            	       [
            	          [
            	             -8.164418,
            	             -70.351778
            	          ]
            	       ]
            	    ]
            	 ]
            	},
            	"address": {
            	 "type": "Point",
            	 "coordinates": [
            	    -8.164418,
            	    -70.351778
            	 ]
            	}
            });

        expect(res.status).toBe(201);
    });

    it('should return 400 when pdv is without document, coverageArea and address', async () => {
      const res = await request(server)
        .post('/api/pdvs')
        .send({
              "tradingName": "Adega do Node",
              "ownerName": "Node Modules"
            });

        expect(res.status).toBe(400);
        expect(res.body.some(result => result.message === '\"document\" is required')).toBeTruthy();
        expect(res.body.some(result => result.message === '\"address\" is required')).toBeTruthy();
        expect(res.body.some(result => result.message === '\"coverageArea\" is required')).toBeTruthy();
    });

    it('should return 400 when pdv is empty', async () => {
      const res = await request(server)
        .post('/api/pdvs')
        .send({});

        expect(res.status).toBe(400);
        expect(res.body.some(result => result.message === '\"document\" is required')).toBeTruthy();
        expect(res.body.some(result => result.message === '\"address\" is required')).toBeTruthy();
        expect(res.body.some(result => result.message === '\"coverageArea\" is required')).toBeTruthy();
        expect(res.body.some(result => result.message === '\"tradingName\" is required')).toBeTruthy();
        expect(res.body.some(result => result.message === '\"ownerName\" is required')).toBeTruthy();
    });

  });

});
