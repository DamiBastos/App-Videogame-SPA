import React from 'react';
import { useEffect } from "react"
import { useDispatch } from 'react-redux';
import {Link} from 'react-router-dom';
import { getVideogames } from '../actions';
import "../styles/LandingPage.css"


export default function LandingPage(){
   const dispatch = useDispatch();
   useEffect(() => dispatch(getVideogames()), [dispatch])

    return (
      <div className='landingPage'>
         
            <Link to ='/home'>
               <button className='landingTitle'>Game BOX</button>
            </Link>
       </div>
    )
}