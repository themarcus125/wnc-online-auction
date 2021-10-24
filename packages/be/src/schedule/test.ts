import schedule from 'node-schedule';
let date = new Date();
date.setSeconds(date.getSeconds() + 2);
const job = schedule.scheduleJob(date, function () {
  console.log('The answer to life, the universe, and everything!');
});
