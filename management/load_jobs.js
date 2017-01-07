'use strict';
const db = require('../db');
const Job = require('../models/job');

// Connect to database
db.connectToDB();

console.log('Loading jobs data...');

var newJob = new Job({
  "id": 140206,
  "title": "Solutions Engineer",
  "created_at": "2016-05-19T00:59:25Z",
  "updated_at": "2016-12-12T23:26:40Z",
  "equity_cliff": "1.0",
  "equity_min": "0.0",
  "equity_max": "0.0",
  "equity_vest": "4.0",
  "currency_code": "USD",
  "job_type": "full-time",
  "salary_min": 100000,
  "salary_max": 150000,
  "tags": [
    {
      "id": 14766,
      "tag_type": "SkillTag",
      "name": "software engineering",
      "display_name": "Software Engineering",
      "angellist_url": "https://angel.co/software-engineering"
    },
    {
      "id": 15670,
      "tag_type": "SkillTag",
      "name": "software development",
      "display_name": "Software Development",
      "angellist_url": "https://angel.co/software-development"
    }
  ],
  "remote_ok": false
});

newJob.save(function(err) {
  if (err) throw err;

  console.log('Job saved successfully!');
});

// Disconnect from database
db.disconnectFromDB();

