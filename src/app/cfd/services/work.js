(function() {
  'use strict';

  angular.module('app.cfd')
  .factory('work', function() {

    var db = [
      { id: 102, work: [18, 1, 4, 1, 1, 1] },
      { id: 101, work: [19, 4, 0, 2, 0, 1] },
      { id: 100, work: [19, 5, 0, 2, 0, 0] }
    ];

    var nextId = function() {
      return _.max(db, 'id').id + 1;
    }

    return {
      get: function() {
        return db;
      },
      add: function(day) {
        day.id = nextId();
        db.unshift(day);
      },
      remove: function(id) {
        _.remove(db, {id: id});
      },
      newWorkDay: function() {
        return {
          work: angular.copy(db[0].work)
        };
      }
    };

  });

}());