import axios from 'axios';
import React, { useEffect, useState } from 'react';
import JobPostBrief from '../components/JobPostBrief';
import { jobAPIs, userAPIs } from '../apis/backend';
import './page.css'

export default function FavoriteJobList() {
    const [myFavoriteJobs, setMyFavoriteJobs] = useState([]);

    function findMyFavorites() {
        axios.get(jobAPIs.findAllMyFavorites)
            .then(response => {
                setMyFavoriteJobs(response.data)
            })
            .catch(error => console.log(error));
    }

    useEffect(findMyFavorites, []);

    const [user, setUser] = useState(null);

    function findCurrentUser() {
        axios.get(userAPIs.getCurrentUser)
            .then(response => setUser(response.data))
            .catch(error => console.log(error))
    }
    useEffect(findCurrentUser);

    const jobListComponent = () => {
        if (!user) {
            return <div>can't see favorites before login</div>
        }

        if (myFavoriteJobs.length === 0) {
            return <div>do not have any favorites</div>
        }
        return myFavoriteJobs.map(
            job => {
                return (<>
                    <JobPostBrief job={job}/>
                </>)
            })
    }

    return (
        <div class="page">
            <h3>We remember what you like!</h3>
            {jobListComponent()}
        </div>
    )
}