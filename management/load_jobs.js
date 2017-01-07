'use strict';
const db = require('../db');
const Job = require('../models/job');
const sample_jobs = require('../sample_job_data');

// Connect to database
db.connectToDB();

console.log('Loading jobs data...');

//loop through jobs and save to db
for(var job of sample_jobs.jobs) {
  var newJob = new Job(job);
  newJob.save();
}

console.log('Successfully loaded all jobs data.');

// Disconnect from database
db.disconnectFromDB();

