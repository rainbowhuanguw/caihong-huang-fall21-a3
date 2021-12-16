import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import JobDetails from './pages/JobDetails';
import JobList from './pages/JobList';
import JobSearch from './pages/JobSearch';

import JobCreator from './pages/JobCreator';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Logout from './pages/Logout';
import FavoriteJobList from './pages/FavoriteJobList';
import Navbar from './components/Navbar';

import reportWebVitals from './reportWebVitals';
import JobEdit from './pages/JobEdit';
import JobDeletion from './pages/JobDeletion';


ReactDOM.render(
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<JobSearch />} />
      <Route path="/createJobs" element={<JobCreator />} />
      <Route path="/list" element={<JobList />} /> 
      <Route path="/job/:jobId" element={<JobDetails />} />

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/job/edit/:jobId" element={<JobEdit />} />
      <Route path="/job/delete/:jobId" element={<JobDeletion />} />
      <Route path="/favorites" element={<FavoriteJobList/>} /> 
    </Routes>
  </Router>
,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
