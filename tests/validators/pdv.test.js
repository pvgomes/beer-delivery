const PdvValidator = require('../../lib/validators/pdv');

describe('pdv validator', () => {

  it('valid pdv', () => {
    let pdvValidator = new PdvValidator();
    let pdv = {
    	tradingName: "Adega do Java",
    	ownerName: "Joaquina Jalenta",
    	document: "04.210.017/0001-09",
    	coverageArea: {
      	type: "MultiPolygon",
      	coordinates: [
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
    	address: {
    	 type: "Point",
    	 coordinates: [
    	    -8.164418,
    	    -70.351778
    	 ]
    	}
    };
    let { error } = pdvValidator.validate(pdv);
    expect(error).toBeFalsy();
  });

  it('invalid pdv without address', () => {
    let pdvValidator = new PdvValidator();
    let pdv = {
    	tradingName: "Adega do Java",
    	ownerName: "Joaquina Jalenta",
    	document: "04.210.017/0001-09",
    	coverageArea: {
      	type: "MultiPolygon",
      	coordinates: [
      	    [
      	       [
      	          [
      	             -8.164418,
      	             -70.351778
      	          ]
      	       ]
      	    ]
      	 ]
    	}
    };
    let { error } = pdvValidator.validate(pdv);
    expect(error).toBeTruthy();
  });

});
