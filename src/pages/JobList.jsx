import axios from 'axios';
import React, { useEffect, useState } from 'react';
import JobPostBrief from '../components/JobPostBrief';
import { jobAPIs } from '../apis/backend';

export default function JobList() {
    const [allJobs, setAllJobs] = useState([]);

    function findAllJobs() {
        axios.get(jobAPIs.findAllJobs)
            .then(response => {
                setAllJobs(response.data)
            })
            .catch(error => console.error(error));
    }

    useEffect(findAllJobs, []);

    const jobListComponent = allJobs ? 
        allJobs.map(
            job => {
                return (<JobPostBrief job={job} key={job}/>)
            }) :
        <div>Didn't find any matching job</div>

    return (
        <div class="page">
            <h3>Come Check Out Our Jobs! </h3>

            {jobListComponent}
        </div>
    )
}