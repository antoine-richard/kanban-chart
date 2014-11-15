var expect = require('chai').expect
  , q      = require('q');

var workService = require('../../src/cfd/work/service');

var data = [
  { dev: 2, test: 1 },
  { dev: 1, test: 2 }
];

var mockResource = {
  query: function(cb) { cb(data); }
};

describe('The work service', function() {

  it('exposes a get function that returns a promise which should resolve to the expected data', function() {

    workService(mockResource, q).get().then(function(result) {
      expect(result).to.equal(data);
    });    
  
  });

});