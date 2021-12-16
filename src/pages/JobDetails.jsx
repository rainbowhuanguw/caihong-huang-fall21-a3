import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import FavoriteButton from '../components/FavoriteButton';
import JobPostDetail from '../components/JobPostDetail';
import { userAPIs, jobAPIs } from '../apis/backend';
import EditButton from '../components/EditButton';
import DeleteButton from '../components/DeleteButton';

export default function JobDetails() {
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

    useEffect(findJobDetails, []);

    // get the current user
    const [currUser, setUser] = useState([]);
    function checkLogin() {
        axios.get(userAPIs.getCurrentUser)
            .then(response => setUser(response.data))
            .catch(error => console.log(error))
    }

    useEffect(checkLogin, [])

    function checkIsFavorited() {
        axios.get(jobAPIs.checkIsFavorite + jobId)
            .then(setFavorite(true))
            .catch(error => console.log(error));
    }

    const [isFavorited, setFavorite] = useState(false);    
    useEffect(checkIsFavorited, []);

    function getJobComponent() {
        if (!job) {
            return <div> No Job found </div>;
        }

        // display delete and edit buttons only when current user is the publisher
        if (job && currUser && job.publisher === currUser) {
            return (
            <div class="detail page">
                <DeleteButton id={jobId}/>
                <EditButton id={jobId}/>
                <FavoriteButton status={isFavorited} id={jobId}/>
                <JobPostDetail job={job}/> 
            </div>)
        } else {
            return (
            <div class="detail page">
                <FavoriteButton id={jobId}/>
                <JobPostDetail job={job}/> 
            </div> )
        }
    }

    return (<> {getJobComponent()} </>);
    
}