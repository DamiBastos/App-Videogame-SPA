import React from "react";
import {Link} from 'react-router-dom';
import '../styles/Card.css';


export default function Card({ name, image, genre, id, rating }) {
    return (
      <div className="bodyCard">
      <div className="container">
       <div className="card">
       <div className="box">
       <div key={id} className="content">
        <Link to={'/videogame/' + id} >
            <h3 >{name}</h3>
             <h5 >Rating: {rating}⭐</h5>
            <h5 >{genre}</h5>
            <img  src={image} alt="videogame_image" type="image/png" width="170" height="110"/>
        </Link>
        </div>
        </div>
        </div>
        </div>
        </div>
        
        )
}