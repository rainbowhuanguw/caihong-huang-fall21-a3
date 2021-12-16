import axios from 'axios';
import React, {useState, useDispatch} from 'react';
import { useNavigate } from 'react-router';
import { userAPIs } from '../apis/backend';
import { APIs } from '../apis/frontend';

export default function Login() {

    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        password: '',
        username: '',
    })

    const [text, setText] = useState('');


    return (
        <div class="page">
            {/* input user name  */}
            <h3>Log in with an existing account</h3>
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

            {/* handles user log in */}
            <div>
                <button 
                    onClick={() => {
                        axios.post(userAPIs.login, userData)
                            .then(response => {
                                console.log(response)
                                navigate(APIs.home)
                            })
                            .catch(error => {
                                console.log(error.response);
                                setText(error.response.data)
                            });
                    }}
                class="button"> Log In
                </button>
            </div>
            <div> {text} </div>
        </div>
    );


} 