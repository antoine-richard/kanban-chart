var _ = require('lodash');

module.exports = /* @ngInject */ function(workResource, $q) {

  var cachedWork, p;

  function doGet() {
    var deferred = $q.defer();
    p = deferred.promise;
    workResource.query(function(work) {
      // bof bof tout ca... $resource utile ? (a voir apres refactoring data model)
      cachedWork = work;
      var uiWork = JSON.parse(JSON.stringify(cachedWork));  // beurk
      deferred.resolve(uiWork);
    });
    return p;
  }

  return {
    get: function() {
      return $q.when(cachedWork || p || doGet());
    },
    add: function(workDay) {
      console.warn("TODO");
    },
    remove: function(id) {
      console.warn("TODO");
    }
  };

};