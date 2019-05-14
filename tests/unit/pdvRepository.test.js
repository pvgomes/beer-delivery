const repository = require('../../lib/pdvRepository');

describe('pdv repository', () => {

  it('should get right duplicatedCode', () => {
    expect(repository.duplicatedCode()).toEqual(11000);
  });

});
