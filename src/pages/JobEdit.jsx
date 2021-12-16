import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { jobAPIs, userAPIs } from '../apis/backend';
import { APIs } from '../apis/frontend';
import '../Button.css';

export default function JobEdit() {
    const navigate = useNavigate();
    const jobId = useParams().jobId; 
    
     // get a job detail
    function findJobDetails() {
        axios.get(jobAPIs.findJobById + jobId)
            .then(response => {
                console.log(response.data);
                setJob(response.data)
            })
            .then(error => console.log(error));
    }

    const [job, setJob] = useState({
        title: '',
        company: '',
        location: '',
        description: '',
        email: '',
        publisher: '',
        website: '',
    });

    useEffect(findJobDetails,[]);
    console.log("job here  -> " + job);

    function handleTitleChange(event) {
        setJob({...job, title: event.target.value});
    }

    function handleCompanyChange(event) {
        setJob({...job, company: event.target.value});
    }

    function handleLocationChange(event) {
        setJob({...job, location: event.target.value});
    }

    function handleDescriptionChange(event) {
        setJob({...job, description: event.target.value});
    }

    function handleEmailChange(event) {
        setJob({...job, email: event.target.value});
    }

    function handleWebsiteChange(event) {
        setJob({...job, website: event.target.value});
    }

    return (
        <div class="page">
            {/* input job title */}
            <h5>Job title: {console.log(job)}</h5>
            <input value={job.title} onChange={
                event => handleTitleChange(event)
            }/>

            {/* input company name */}
            <h5>Company Name:</h5>
            <input value={job.company}
                onChange={handleCompanyChange} />

            {/* input job description */}
            <h5>Description:</h5>
            <input value={job.description} 
                onChange={handleDescriptionChange} />

            {/* input job location */}
            <h5>Location:</h5>
            <input value={job.location} 
                onChange={handleLocationChange} />

            {/* input email */}
            <h5>Email:</h5>
            <input value={job.email} 
                onChange={handleEmailChange} />

            {/* input website */}
            <h5>Company Website (Optional): </h5>
            <input value={job.email} 
                onChange={handleWebsiteChange} />

            {/* create job button */}
            <button onClick={
                () => axios.put(jobAPIs.editJob + jobId, job)
                    .then(response => {
                        navigate(APIs.getJobDetails + jobId) // redirects to job details page
                        console.log(response)
                    })
                    .catch(error => console.error(error))
            } class="button" > Submit</button>
            </div>
    )
    // 

}