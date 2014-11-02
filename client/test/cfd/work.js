var chai   = require('chai')
  , expect = chai.expect;

var work = require('../../src/cfd/work');

describe('The work service', function() {

  it('should have some been initialized with 4 days of work', function() {
    expect(work().get().length).to.equal(4);
  });

});