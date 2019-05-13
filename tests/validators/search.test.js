const SearchValidator = require('../../lib/validators/search');

describe('search validator', () => {

  it('valid search', () => {
    let searchValidator = new SearchValidator();
    let search = {
    	lng: -46.474983,
    	lat: -23.610245
    };
    let { error } = searchValidator.validate(search);
    expect(error).toBeFalsy();
  });

  it('invalid search with no number for latitude', () => {
    let searchValidator = new SearchValidator();
    let search = {
    	lng: -46.474983,
    	lat: "23.610245asd"
    };
    let { error } = searchValidator.validate(search);
    expect(error).toBeTruthy();
  });


  it('invalid search without longitude', () => {
    let searchValidator = new SearchValidator();
    let search = {
    	lat: -23.610245
    };
    let { error } = searchValidator.validate(search);
    expect(error).toBeTruthy();
  });
});
