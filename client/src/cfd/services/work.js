var _ = require('lodash');

module.exports = function() {

  var db = [
    { _id: 100, rdyDev: 15, dev: 0, rdyTest: 0, test: 0, rdyRelease: 0, done: 0 },
    { _id: 101, rdyDev: 8, dev: 4, rdyTest: 2, test: 1, rdyRelease: 0, done: 0 },
    { _id: 102, rdyDev: 5, dev: 3, rdyTest: 2, test: 3, rdyRelease: 1, done: 1 },
    { _id: 103, rdyDev: 3, dev: 4, rdyTest: 1, test: 2, rdyRelease: 2, done: 3 }
  ];

  var nextId = function() {
    if (!db.length) return 0; 
    return _.max(db, '_id')._id + 1;
  };

  return {
    get: function() {
      return db;
    },
    add: function(day) {
      day._id = nextId();
      db.unshift(day);
    },
    remove: function(id) {
      _.remove(db, {_id: id});
    },
    newDay: function() {
      return _.omit(db[0], '_id');
    }
  };

};