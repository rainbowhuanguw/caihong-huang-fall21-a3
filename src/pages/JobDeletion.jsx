
import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { jobAPIs } from "../apis/backend";

/**
 * Deletes a job 
 */
export default function JobDeletion() {
    const navigate = useNavigate();
    const jobId = useParams().jobId; 

    function deleteJob() {
        axios.delete(jobAPIs.deleteJob + jobId)
            .then(response => {
                console.log(response.data);
                navigate('/');
            })
            .catch(error => console.log(error))
    }

    function sleep() {
        let start = (new Date()).getTime();
        while ((new Date()).getTime() - start < 1000) {
          continue;
        }
    }

    useEffect(deleteJob);
    useEffect(sleep);

    return (
    <div class='page'> 
        Job has been deleted.. Redirecting to home page 
    </div>
    )
}
