'use strict';
require('dotenv').config();
const request = require('request');
const db = require('../db');
const Job = require('../models/job');
const sample_jobs = require('../sample_job_data');

console.log('Loading jobs data...');

// Connect to database
var conn = db.connectToDB();

var locationTags = [
  {name: 'Atlanta', tag_id: 1616},
  {name: 'Austin', tag_id: 1617},
  {name: 'Boston', tag_id: 1620},
  {name: 'Chicago', tag_id: 1626},
  {name: 'Cleveland', tag_id: 1630},
  {name: 'Houston', tag_id: 1645},
  {name: 'London', tag_id: 1695},
  {name: 'Los Angeles', tag_id: 1653},
  {name: 'New York', tag_id: 1664},
  {name: 'Paris', tag_id: 1842},
  {name: 'San Francisco', tag_id: 1692},
  {name: 'San Jose', tag_id: 1693},
  {name: 'Seattle', tag_id: 1680},
  {name: 'Toronto', tag_id: 1702},
  {name: 'Vancouver', tag_id: 1698},
  {name: 'Washington, DC', tag_id: 1691}
]

//OAuth with AngelList
var url = "https://api.angel.co/1/tags/1617/jobs?access_token=" + 
  process.env.ANGELLIST_TOKEN;

request(url, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    for(var job of JSON.parse(body).jobs) {
      var newJob = new Job(job);
      newJob.save(function (err, job) {
        if (err) console.error(err);
      });
    }
  }
});


// //loop through jobs and save to db
// for(var job of sample_jobs.jobs) {
//   var newJob = new Job(job);
//   console.log('newJob: ' + newJob)
//   newJob.save();
// }

console.log('Successfully loaded all jobs data.');