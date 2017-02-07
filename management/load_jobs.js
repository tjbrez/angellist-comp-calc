'use strict';
require('dotenv').config();
const locationTags = require('./locations.json');
const request = require('request-promise');
const db = require('../db');
const Job = require('../models/job');
const sample_jobs = require('../sample_job_data');

console.log('Loading jobs data...');

// Connect to database
db.connectToDB();

var pageCounts = {};

for (var key in locationTags) {
  var location = locationTags[key];
  getJobsForLocationTag(location);
}

function setPageCount(tag, count){
  pageCounts[tag] = count;
}

function getPageCount(tag){
  return pageCounts[tag];
}

function getJobsForLocationTag(location){
  setPageCount(location.tag_id, 1);
  let currentPage = 1;
  let pagePromises = [];
  let firstPagePromise = getPage(currentPage, location);

  firstPagePromise
    .then(value => {
      currentPage = 2;
      while(currentPage <= getPageCount(location.tag_id)) {
        pagePromises.push(getPage(currentPage, location));
        currentPage++;
      }

      Promise.all(pagePromises).then(values => {
        setTimeout(function() {
          console.log('Successfully loaded all jobs for tag ' + location.name);
          //db.disconnectFromDB();
        }, 1000);
      });

    });
}

function getPage(currentPage, location) {
  let url = "https://api.angel.co/1/tags/"+ location.tag_id +"/jobs?access_token=" + 
    process.env.ANGELLIST_TOKEN + "&page=" + currentPage;

  let pagePromise = request(url, function (error, response, respBody) {
    parsePage(error, response, respBody, location);
  });

  return pagePromise;
}

function parsePage(error, response, respBody, loc) {
  let savePromises =[];
  let body;
  try {
    body = JSON.parse(respBody);
  }
  catch (e) {
    return console.log('json error on page');
  }

  if (!error && response.statusCode == 200) {
      for(var job of body.jobs) {
        var newJob = new Job(job);
        savePromises.push(newJob.save());
      }
  }

  Promise.all(savePromises).then(values => {
    console.log('Loaded jobs for page ' + body.page + ' of ' + body.last_page + ' for ' + loc.name);
  });

  setPageCount(loc.tag_id, body.last_page);
}


