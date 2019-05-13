# Beer Delivery
We are a delivery app which takes care to delivery beers quickly and to do it we must find Points of Sale closest to our customers

[![Build Status](https://travis-ci.org/pvgomes/beer-delivery.svg?branch=master)](https://travis-ci.org/pvgomes/beer-delivery)


### UbiquitousLanguage
Beer Delivery = Our app name

PDV = Point-of-sale


## Set up environment

Install [Docker](https://docs.docker.com/install/)  and [Docker-compose](https://docs.docker.com/compose/install/)

```
docker-compose up -d
```

### Tests
`docker exec -it app npm test`

### Api

Search
```
curl -X GET 'http://127.0.0.1/api/search?lng=-46.474983&lat=-23.610245'
```

Create PDV
```
curl -X POST \
  http://127.0.0.1/api/pdvs/ \
  -H 'Content-Type: application/json' \
  -d '{
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
}'
```

Get By Id
```
curl -X GET http://127.0.0.1/api/pdvs/{ID}
```


### Deployment
`WIP`
