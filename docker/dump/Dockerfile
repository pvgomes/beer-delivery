FROM mongo:latest
COPY pdv.json /pdv.json
CMD mongoimport -h mongodb -d beer-delivery -c pdvs --file /pdv.json --jsonArray
