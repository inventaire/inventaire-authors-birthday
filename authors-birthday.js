/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const schedule = require('node-schedule');
require('colors').enabled = true;

const postAuthorsAtInterval = require('./lib/post_authors_at_interval');
const getAuthorsByBirthday = require('./lib/get_authors_by_birthday');

const initTodayGreetings = () => getAuthorsByBirthday(0)
.then(postAuthorsAtInterval)
.catch(err => console.log('general err'.red, err.stack || err));

const time = {hour: 6, minute: 0};
console.log('daily starting time'.green, time);
schedule.scheduleJob(time, initTodayGreetings);

// just keeping the server alive node-schedule can't
const alive = () => console.log('alive!'.green);
setInterval(alive, 24*60*60*1000);
