const mongoose = require("mongoose")
const JobSchema = require('../schema/Job.Schema').JobSchema

const JobModel = mongoose.model("Job", JobSchema);

function insertJob(job) {
    return JobModel.create(job);
}

function findAllJobs() {
    return JobModel.find().exec();
}

function findMyJobs(user) {
    return JobModel.find({publisher: user}).exec();
}

function findJobsByTitle(title) {
    const jobTitle = title;
    return JobModel.find({title: {
            $regex: '[\s\S]*'+jobTitle+'[\s\S]*',
            $options: 'i'
        }}).exec();
}

function findJobById(id) {
    return JobModel.findOne({_id: id}).exec();
}

function findJobsFavoriteBy(user) {
    return JobModel.find({favoriteBy: user}).exec();
}

function checkIsFavoriteJob(id, user) {
    return JobModel.findOne({_id: id}, {favoritedBy: user}).exec();
}

function checkIfPublishedByUser(id, user) {
    return JobModel.findOne({_id: id}, {publisher: user}).exec();
}

function edit(id, job) {
    return JobModel.updateOne(
        {_id: id},
        { $set: {
            title: job.title, 
            descrption: job.description, 
            email: job.email, 
            company: job.company, 
            location: job.location}
        })
    .exec();
}

function remove(id) {
    return JobModel.remove({_id: id}).exec();
}

function favorite(id, user) {
    return JobModel.updateOne(
        {_id: id}, 
        {$push: {favoriteBy: user}},
    ).exec();
}

function unfavorite(id, user) {
    return JobModel.updateOne(
        {_id: id}, 
        {$pull: {favoriteBy: user}},
    ).exec();
}


// Make sure to export a function after you create it!
module.exports = {
    insertJob,
    findAllJobs, 
    findJobsByTitle,
    findJobById,
    findMyJobs,
    findJobsFavoriteBy,
    favorite,
    unfavorite,
    checkIsFavoriteJob,
    edit,
    checkIfPublishedByUser,
    remove,
};