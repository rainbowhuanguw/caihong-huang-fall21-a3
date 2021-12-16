import { Link } from 'react-router-dom';
import './JobPostBrief.css';
import { APIs } from '../apis/frontend';
/**
 * Brief respresentation of a job posting,
 * shown on search and browse all 
 */
export default function JobPostBrief(props) {
    const job = props.job;

    return (
    <div class="brief">
        <p> Title : {job.title}</p>
        <p> Location: {job.location} </p>
        <p> Company: {job.company} </p>
        <p> Link: <Link to={APIs.getAJob + job._id}> {job.title}</Link></p>
    </div>
    )
}