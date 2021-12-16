import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { jobAPIs, userAPIs } from '../apis/backend';
import { APIs } from '../apis/frontend';
import '../Button.css';

/**
 * Creates a new job based on user input
 */
export default function JobCreator() {
    const navigate = useNavigate();
    const [jobForm, setJobForm] = useState({
        title: '',
        company: '',
        location: '',
        description: '',
        email: '',
        publisher: '',
        website: '',
    });

    // get the current user
    const [currUser, setUser] = useState([]);
    function checkLogin() {
        axios.get(userAPIs.getCurrentUser)
            .then(response => setUser(response.data))
            .catch(() => navigate(APIs.login))
    }

    useEffect(checkLogin, [])

    return (
        <div class='page'>
            <h3>Be an active contributor today by submitting a job! </h3>
            {/* input job title */}
            <h5>Job title:</h5>
            <input value={jobForm.title} 
                onChange={
                    e => setJobForm({
                        ...jobForm,
                        title: e.target.value
                })} />

            {/* input company name */}
            <h5>Company Name:</h5>
            <input value={jobForm.company}
                onChange={
                    e => setJobForm({
                        ...jobForm,
                        company: e.target.value
                })} />

            {/* input job description */}
            <h5>Description:</h5>
            <input value={jobForm.description} 
                onChange={
                    e => setJobForm({
                        ...jobForm,
                        description: e.target.value
                })} />

            {/* input job location */}
            <h5>Location:</h5>
            <input value={jobForm.location} 
                onChange={
                    e => setJobForm({
                        ...jobForm,
                        location: e.target.value
                })} />

            {/* input email */}
            <h5>Email:</h5>
            <input value={jobForm.email} 
                onChange={
                    e => setJobForm({
                        ...jobForm,
                        email: e.target.value
                })} />

            {/* input website*/}
            <h5>Company Website(Optional):</h5>
            <input value={jobForm.website} 
                onChange={
                    e => setJobForm({
                        ...jobForm,
                        website: e.target.value
                })} />

            {/* create job button */}
            <div>
            <button onClick={
                () => axios.post(jobAPIs.createJob, {...jobForm, publisher: currUser})
                    .then(response => {
                        console.log(response.data);
                        navigate(APIs.getJobDetails + response.data._id) // redirects to details page
                    })
                    .catch(error => console.error(error))
            } class="button"> Submit</button>
            </div>

        </div>
    )


}