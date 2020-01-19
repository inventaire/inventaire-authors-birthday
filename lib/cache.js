/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let cache;
const bluebird = require('bluebird');
const dataPath = process.cwd() + '/cache';

const level = require('level-party');
const db = level(dataPath, { encoding: 'json' });

const get = bluebird.promisify(db.get.bind(db));
const set = bluebird.promisify(db.put.bind(db));

module.exports = (cache = {
  get(key, request){
    return get(key)
    .then(value => JSON.parse(value)).catch(function(err){
      if (err.notFound) {
        return request()
        .then(res => cache.set(key, res))
        .catch(function(err){
          console.error('cache req err', err);
          throw err;
        });
      } else {
        throw err;
      }
    });
  },

  set(key, value){
    return set(key, JSON.stringify(value))
    .then(() => value);
  }
});
