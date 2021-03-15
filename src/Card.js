import React from "react";
import Ratings from "./Ratings";

function Card({image, address, review, rating, yelp_url, score}){
    console.log(typeof(score))
    return(
        <div className = "search-result">
            <img src = {image} alt= 'parkinglotimages' className = "lot-image"></img>
            <div className = "info">
                <p className = "address">{address}</p>
                <Ratings rating = {rating}/>
                <p>{review} Reviews</p>
            </div>
            <div className ="score">
                <nav>
                    <ul className = "yelp_url">{yelp_url}</ul>
                </nav>
                <p className = "score-result">Score: {score.toFixed(2)}</p>
            </div>
        </div>
    );
}

export default Card;