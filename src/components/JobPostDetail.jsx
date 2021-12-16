import '../text.css';

export default function JobPostDetail(props) {
    const job = props.job;

    const email = "mailto:" + job.email;
    return (<div class="detail"> 
        <div class="field"> Job title: 
            <div class="value"> {job.title} </div>
        </div>
        <div clas="field"> Company Name: 
            <div class="value"> {job.company} </div>
        </div>
        <div class="field">Location: 
            <div class="value"> {job.location} </div>
        </div>
        <div class="field">Description: 
            <div class="value"> {job.description} </div>
        </div>
        <div class="field">Email: 
            <div class="value"> <a href={email}> {job.email} </a></div>
        </div>
        <div class="field">Publisher: 
            <div class="value"> {job.publisher} </div>
        </div>
        <div class="field">Website: 
            <div class="value"> <a href={job.website}>{job.company}</a></div>
        </div>
    </div>);
}

