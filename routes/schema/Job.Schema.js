const Schema = require('mongoose').Schema;

exports.JobSchema = new Schema({
    title: String,
    company: String,
    location: String,
    description: String, 
    email: String,
    date: String,
    publisher: String, 
    website: String,
    favoriteBy: [String],
}, {
  $currentDate: {
    createtime: true
  }
},
{ upsert: true } 
// this explicitly declares what collection we're using
, { collection : 'jobs' });