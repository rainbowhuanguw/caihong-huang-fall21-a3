import axios from 'axios';
import React, {useState} from 'react';
import { useNavigate } from 'react-router';
import { userAPIs } from '../apis/backend';


export default (props) => {

    const [userData, setUserData] = useState({
        password: '',
        username: '',
    })

    const [text, setText] = useState('');

    return (
        <div class="page">
            {/* input user name  */}
            <h3>Sign up for a new account</h3>
            <h5>Username:</h5>
            <input value={userData.username} onChange={(e) => {
                const username = e.target.value;
                setUserData({
                    ...userData,
                    username: username
                })
            }}/>

            {/* input password */}
            <h5>Password:</h5>
            <input value={userData.password} onChange={(e) => {
                const password = e.target.value;
                setUserData({
                    ...userData,
                    password: password
                })
            }} type='password' />
            
            {/* handles user sign up */}
            <div>
                <button
                    onClick={() => {
                        axios.post(userAPIs.signup, userData)
                            .then(response => {
                                console.log(response)
                                setText('please log in with your user name')
                            })
                            .catch(error => {
                                console.log(error.response.data)
                                setText(error.response.data)
                            });
                    }}
                class="button">Sign Up
                </button>
            </div>
            <div>{text}</div>
        </div>
    );


} 