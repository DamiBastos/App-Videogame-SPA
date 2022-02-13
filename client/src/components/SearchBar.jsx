import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getNameVideogames } from '../actions';
import  '../styles/SearchBar.css'

export default function SearchBar() {
    const dispatch = useDispatch();
    const [name, setName] = useState("")

    function handleInputChange(e) {
        e.preventDefault();
        setName(e.target.value);
        
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(getNameVideogames(name))
        setName("")
    }



      return (
        <div className='searchBody'>
        <form action="" className="search-bar">

         <input
            className="search"
            type="search"
            placeholder="Search Videogames..."
            value={name}
            onChange={(e) => handleInputChange(e)}
          />
<button class="search-btn" type="submit"  onClick={(e) => handleSubmit(e)}>
		<span>Search</span>
	</button>
          </form>
          </div>
      )
}   
      