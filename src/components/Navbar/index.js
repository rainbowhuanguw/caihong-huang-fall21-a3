import React, { useEffect, useState } from "react";
import { userAPIs } from "../../apis/backend";
import axios from 'axios';
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink,
  } from './NavbarElements';

import { APIs } from "../../apis/frontend";
import '../../text.css'

export default function Navbar() {
    // check log in
    function checkLogin() {
        axios.get(userAPIs.getCurrentUserUnsafe)
            .then(response => {
                setCurrUser(response.data)
            })
            .catch(error => console.log(error))
    }

    const [currUser, setCurrUser] = useState('');
    useEffect(checkLogin);

    console.log("user here" + currUser);
    
    // get views
    function getViews() {
        if (currUser != "") {
            return (<>
                
                <NavLink to={APIs.createJobs} activeStyle>
                    Create Jobs
                </NavLink>
                <NavLink to={APIs.favorites} activeStyle>
                    Favorites
                </NavLink>
                <div class="user-text">{currUser}</div>
                <NavBtn>
                    <NavBtnLink to={APIs.logout}>Log Out</NavBtnLink>                
                </NavBtn>
            </>)
        } else {
            return (<>
                <NavBtn>
                    <NavBtnLink to={APIs.login}>Log In</NavBtnLink>                
                </NavBtn>
                <NavBtn>
                    <NavBtnLink to={APIs.signup}>Sign Up</NavBtnLink>                
                </NavBtn>
            </>)
        }
    }

    return (
        <>
           <Nav>
            <Bars />
            <NavMenu>
                <NavLink to={APIs.home} activeStyle>
                    Search
                </NavLink>
                <NavLink to={APIs.allJobs} activeStyle>
                    Browse
                </NavLink>
                
                {getViews()}
            </NavMenu> 
           </Nav> 
        </>
    );
};
