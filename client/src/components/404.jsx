import React from 'react';
import {Link} from 'react-router-dom';
import pageNotFound from '../media/pageNotFound.png';
import '../styles/NotFound.css';


export default function NotFound(){
    return (
        <div className="container" >
            <img src={pageNotFound} className="image" type="png" alt="image404" width="300" height="300" />
            <Link to='/home'><button className="styles">Previous Stage</button></Link>

        </div>
    )
}