import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { jobAPIs } from '../apis/backend';
import './FavoriteButton.css'

export default function FavoriteButton(props) {
    // check if this job has been favorited
    // const id = props.id;
    const [isFavorited, setFavorite] = useState(props.status);
    const id = props.id;


    // function checkIsFavorited() {
    //     axios.get(jobAPIs.checkIsFavorite + id)
    //         .then(setFavorite(true))
    //         .catch(error => console.log(error));
    // }

    // const [isFavorited, setFavorite] = useState(false);    
    // useEffect(checkIsFavorited, []);

    // console.log("favorite status" + isFavorited);

    // toggles favorite and unfavorite on click
    function handleFavorite() {
        if (!isFavorited) {
            // favorites a job 
            axios.post(jobAPIs.favoriteAJob + id)
                .then(response => {
                    console.log(response);
                    setFavorite(true);
                })
                .catch(error => console.log(error))    
        } else {
            // unfavorite
            axios.post(jobAPIs.unfavoriteAJob + id)
                .then(response => {
                    console.log(response);
                    setFavorite(false);
                })
                .catch(error => console.log(error))
        }
    }

    const sourceLink = isFavorited === true ? '/pics/red-heart.png' : '/pics/white-heart.png';

    return <button onClick={handleFavorite} class="favorite-button">
        <img src={sourceLink} class="favorite-button"/> 
    </button>
}