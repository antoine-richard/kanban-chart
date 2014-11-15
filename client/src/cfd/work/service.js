var _ = require('lodash');

module.exports = /* @ngInject */ function(workResource, $q) {

  var cachedWork, p;

  function doGet() {
    var deferred = $q.defer();
    p = deferred.promise;
    workResource.query(function(work) {
      cachedWork = JSON.parse(JSON.stringify(work));  // beurk
      deferred.resolve(cachedWork);
    });
    return deferred.promise;
  }

  function nextId() {
    if (!cachedWork.length) return 0;
    return _.max(cachedWork, '_id')._id + 1;
  }

  return {
    get: function() {
      return $q.when(cachedWork || p || doGet());
    },
    newDay: function() {
      return _.omit(cachedWork[0], '_id');
    },
    add: function(day) {
      day._id = nextId();
      cachedWork.unshift(day);
    },
    remove: function(id) {
      _.remove(cachedWork, {_id: id});
    }
  };

};