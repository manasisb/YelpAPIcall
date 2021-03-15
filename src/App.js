import React, { useEffect, useState } from "react";
import axios from "axios";
import {API_BASE_URL, BEARER_TOKEN} from "./config";
import Card from "./Card";


function App(){

    const [business, setBusiness] = useState([]);
    const [loading, setLoading] = useState(true);
    const [locations, setLocations] = useState('San Francisco');
    const [click, setClick] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        setClick(false);
        const data = await axios.get(`${'https://cors-anywhere.herokuapp.com/'}${API_BASE_URL}`,{
            headers:{
                'Authorization': `BEARER ${BEARER_TOKEN}`,
                'Access-Control-Allow-Origin': '*'
            },
            params: {
                location: locations,
                categories : 'parking',
                limit: 5
            }
        }).then((data) =>{
            setBusiness(data.data.businesses);
            console.log(business);
            setLoading(false);
        }).catch((err) => {
            console.error(err);
        });
    }

    useEffect(() =>{
        fetchData()
        setLocations('');
    },[click]);

    function handleChange(e){
        setLocations(e.target.value);
        console.log(locations);
    }

    function handleSubmit(e){
        e.preventDefault();
        setClick(true);
        
    }

    if(loading){
        return(
            <div className = "section-center">
                <h1>Loading...!</h1>
            </div>
        )
    }
    return (
        <div>
            <section className = "section-center">
                <h3 className = "search">Lowest Rated Parking Lots In:</h3>
                <form className = "form-control" onSubmit = {handleSubmit}>
                    <input 
                    className = "city" 
                    type = "text" 
                    placeholder = "San Francisco" 
                    onChange = {handleChange}
                    value = {locations}></input>
                    <button className = "submit-btn" type = "submit">Go!</button>
                </form>
            </section>
            <div>
                {business.map((item) =>{
                    const address = item.location.address1;
                    const {id, image_url, review_count, rating, url} = item;
                    const score = (Number(review_count) * Number(rating))/ (Number(rating) + 1);
                    return <Card key = {id}
                    image = {image_url}
                    address = {address}
                    review = {review_count}
                    rating = {rating}
                    yelp_url = {url}
                    score = {score}
                    />
                }).sort(function(a,b){
                    return b.score - a.score;
                })}
            </div>
        </div>
    )
}

export default App;