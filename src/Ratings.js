import React from "react";
import Rating from "react-rating";


function Ratings({rating}){
    return (
        <div className = "rating">
            <Rating
            emptySymbol="far fa-star"
            fullSymbol="fas fa-star"
            fractions={2}
            readonly
            initialRating = {rating}
            />
        </div>
    )
}

export default Ratings;