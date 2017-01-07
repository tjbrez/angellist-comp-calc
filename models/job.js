var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tagSchema = new Schema({
  id: Number,
  tag_type: String,
  name: String,
  display_name: String,
  angellist_url: String
});

var jobSchema = new Schema({
  id: Number,
  title: String,
  created_at: Date,
  updated_at: Date,
  equity_cliff: Number,
  equity_min: Number,
  equity_max: Number,
  equity_vest: Number,
  currency_code: String,
  job_type: String,
  salary_min: Number,
  salary_max: Number,
  remote_ok: Boolean,
  tags: [tagSchema]
});

var Job = mongoose.model('Job', jobSchema);

module.exports = Job;