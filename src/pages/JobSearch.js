import { useEffect, useState } from 'react';
import axios from 'axios';
import JobPostBrief from '../components/JobPostBrief';
import { jobAPIs, userAPIs } from '../apis/backend';
import '../Button.css';

export default function JobSearch() {
  const [formInput, setFormInput] = useState('');
  const [jobs, setJobs] = useState([])
  const [errorMsg, setError] = useState('');
  const [loggedInName, setLoggedInName] = useState('');

  function onSearchButtonClick() {
    
    if (!formInput) {
      setError("You must type in a job title.");
      return;
    }

    axios.get(jobAPIs.findJobByTitle + formInput)
      .then(response => {
        console.log(response.data)
        setJobs(response.data)
      })
      .catch( error => {
        setError(error.response)
        console.log(error.response)
      });
  }

  function getCurrentUser() {
    axios.get(userAPIs.getCurrentUser)
      .then(response => setLoggedInName(response.data))
      .catch(error => {
        console.log(error.response)
      })
  }

  useEffect(getCurrentUser);

  const jobSearchComponent = jobs ? jobs.map(
    job => {
        return (
            <JobPostBrief job={job}> 
                {job.title} 
            </JobPostBrief>)
    }) : 
    (<div>No job found</div>)


  return (
    <div class="page">
      <h3> hi, {loggedInName}</h3>
      
      <input value={formInput} onChange={(e) => {
        setFormInput(e.target.value)
      }} />
      <button onClick={onSearchButtonClick} class="button">
        Search for Jobs
      </button>

      <div>
        {jobSearchComponent}
      </div>
      {errorMsg}

    </div>
 
  );
}
