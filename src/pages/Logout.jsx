import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { userAPIs } from '../apis/backend';

export default function Logout() {
  const navigate = useNavigate();

  function logout() {
    axios.post(userAPIs.logout)
      .then(() => navigate('/'))
      .catch(console.error)
  }

  function sleep() {
    let start = (new Date()).getTime();
    while ((new Date()).getTime() - start < 1000) {
      continue;
    }
  }

  useEffect(logout);
  useEffect(sleep); // sleep for 5 secs 

  return (
  <div class="page">Logging out.. Redirecting to the home page </div>
  )
}