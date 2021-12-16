const express = require('express');
const auth_middleware = require('./auth_middleware');
const router = express.Router();
const jobAccessor = require('./models/Job.Model');

// Returns all entered jobs
router.get('/findAllJobs', function(request, response) {
  return jobAccessor.findAllJobs()
    .then(jobResponse => response.status(200).send(jobResponse))
    .catch(error => response.status(400).send(error))
})

// find all jobs with matching name 
router.get('/findJobById/:jobId', function(request, response) {
  const jobId = request.params.jobId;
  return jobAccessor.findJobById(jobId)
    .then(jobResponse => response.status(200).send(jobResponse))
    .catch(error => response.status(400).send("Could not find job with this id"))
})

// find all jobs with matching name 
router.get('/findJobByTitle/:jobTitle', function(request, response) {
  const jobTitle = request.params.jobTitle;
  return jobAccessor.findJobsByTitle(jobTitle)
    .then(jobResponse => response.status(200).send(jobResponse))
    .catch(error => response.status(400).send("Could not find job with this title"))
})

// find all the jobs created by a specific user
router.get('/findMyJobs', function(request, response) {
  const userName = request.session.username;
  return jobAccessor.findMyJobs(userName)
    .then(jobResponse => response.status(200).send(jobResponse))
    .catch(error => response.status(400).send(error))
})

router.get('/isMyJob/:jobId', function(request, response) {
  const jobId = request.params.jobId;
  const user = request.session.username; 

  return jobAccessor.checkIfPublishedByUser(jobId, user)
    .then(response.status(200).send("This job is created by current user"))
    .catch(response.status(400).send("This job is not created by current user"))

})

// Creates a job 
router.post('/create', auth_middleware, (request, response) => {
  const job = request.body;
  if(!job.title) {
    return response.status(422).send("Missing title");
  } else if (!job.company ) {
    return response.status(422).send("Missing company");
  } else if (!job.location) {
    return response.status(422).send("Missing location");
  } else if (!job.description) {
    return response.status(422).send("Missing description");
  } else if (!job.email) {
    return response.status(422).send("Missing email");
  }
  
  jobAccessor.insertJob(request.body)
    .then(jobResponse => {
      response.status(200).send(jobResponse)
    })
    .catch(error => response.status(400).send(error))
})

// edits a job 
router.put('/edit/:jobId', auth_middleware, (request, response) => {
  const user = request.session.username;
  const job = request.body;
  const id = request.params.jobId;

  if (!user) {
    return response.status(422).send("Must log in before editing a job.");
  }

  jobAccessor.edit(id, job)
    .then(jobResponse => {
      response.status(200).send(jobResponse);
      console.log("Just edited the job posting.")
    })
    .catch(error => response.status(400).send("Problems occurred when editing job posting."))
})

// delete a job 
router.delete('/delete/:jobId', auth_middleware, (request, response) => {
  const user = request.session.username;
  const id = request.params.jobId;

  if (!user) {
    return response.status(422).send("Must log in before deleting a job.");
  }

  jobAccessor.remove(id) 
    .then(jobResponse => {
      response.status(200).send("Job has been deleted");
    })
    .catch(error => response.status(400).send("Problems occurred when deleting a job posting."))

})


// a user sets a job as favorite
router.post('/favoriteJob/:jobId', auth_middleware, (request, response) => {
  const user = request.session.username; 
  const jobId = request.params.jobId;
  if (!user) {
    return response.status(422).send("Must log in before favoriting a job.");
  }

  jobAccessor.favorite(jobId, user)
    .then(jobResponse => {
      if (jobResponse) {
        response.status(200).send("User has favorited this job." + jobResponse.data)
      } else {
        response.status(400).send("Is favoriting this job" + jobResponse.data)
      }
    })
    .catch(error => response.status(400).send("Problems occurred when favoriting a job."))
});

// a user unfavorites a job 
router.post('/unfavoriteJob/:jobId', auth_middleware, (request, response) => {
  const user = request.session.username; 
  const jobId = request.params.jobId;

  if (!user) {
    return response.status(422).send("Must log in before unfavoriting a job.");
  }

  jobAccessor.unfavorite(jobId, user)
    .then(jobResponse => {
      if (jobResponse) {
        response.status(200).send("User has unfavorited this job." + jobResponse.data)
      } else {
        response.status(400).send("Is unfavoriting this job" + jobResponse.data)
      }
    })
    .catch(error => response.status(400).send("Problems occurred when unfavoriting a job. "))
})

// checks if a user has set this job as favorite
router.get('/isMyFavorite/:jobId', auth_middleware, (request, response) => {
  const user = request.session.username; 
  const jobId = request.params.jobId;

  if (!user) {
    return response.status(422).send("Must log in before checking if a job is favorite.");
  }

  jobAccessor.checkIsFavoriteJob(jobId, user)
    .then(jobResponse => {
      response.status(200).send("User has favorited this job!" + jobResponse.data)
    })
    .catch(error => response.status(400).send("Problems occurred when checking if a job is user's favorite."))
})

// finds all the favorite jobs of a user
router.get('/myFavorites', auth_middleware, (request, response) => {
  const user = request.session.username; 

  if (!user) {
    return response.status(422).send("Must log in before favoriting a job.");
  }
  jobAccessor.findJobsFavoriteBy(user)
    .then(jobResponse => {
      response.status(200).send(jobResponse)
      console.log("These are the user's favorite jobs!")
    })
    .catch(error => response.status(400).send("Problems occurred when finding favorites."))
})


module.exports = router; // <== Look at our new friend, module.exports!