import React from "react";
import { useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getVideogames , filterGamesByGenre,filterGamesByRating ,filterCreatedGames, orderByName,sortGamesByRating } from "../actions";
import {Link} from 'react-router-dom';
import Card  from './Card';
import Paginado from "./Paginado";
import SearchBar from './SearchBar';
import loading from '../media/loading.png';
import imageNotFound from '../media/imageNotFound.png';
import '../styles/Home.css';


export default function Home (){
// esto es para despachar mis acciones--Hooks--
    const dispatch = useDispatch();//aqui traigo todo el estado de Videogames
    const allVideogames = useSelector((state) => state.videogames);
// estados locales -pagina actual y algo que me setee dicha pagina
    const [ order, setOrder] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [videogamesPerPage, setVideogamesPerpage ] = useState(15);
    const indexOfLastVideogame = currentPage * videogamesPerPage //15
    const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage //0 
    const currentVideoGame = allVideogames.slice(indexOfFirstVideogame, indexOfLastVideogame)  
    
    
    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    }


    useEffect (() =>{  
        dispatch(getVideogames());
    },[dispatch])

    function handleClick(e){ //con esta funcion ejecutamos el boton 'Volver...'
     e.preventDefault();
     dispatch(getVideogames());//lo resetea
    }

    function handleSortRating(e) {
        dispatch(sortGamesByRating(e.target.value));
        setCurrentPage(1); //idem al handleSort
        setOrder(`Ordered ${e.target.value}`);
    }

    function handleFilterRating(e) {
        e.preventDefault();
        dispatch(filterGamesByRating(e.target.value));
    }

    function handleSort(e) {
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);//setea mi estado local y lo renderiza
        setOrder(`Ordered ${e.target.value}`);
    }
    

    function handleFilterCreated(e){
        dispatch(filterCreatedGames(e.target.value));
        setCurrentPage(1);
    }

    function handleFilterGenre(e){
     dispatch(filterGamesByGenre(e.target.value));
     setCurrentPage(1);
     
    }


    //renderizado
    return ( 
        <div className="bodyHome">
            <SearchBar/>
           
           <div className="title">
            
            <h1 className="titleHome" onClick={e => {handleClick(e)}}>GameBOX</h1>    
            </div>
           
            <button className="createBtn">
          <Link to= '/videogame' className="link">create your videogame</Link>
          </button>
          
          

          <div>

          <button className="selectInit" onClick={e => {handleClick(e)}}>
             Reload all videogames
          </button>
          
             <select className="select" onChange={e => {handleSort(e)}}>
             <option className="option">alphabetical order</option>
                <option value= 'asc'>A-Z</option>
                <option value= 'des'>Z-A</option>
             </select>
             <select className="select" onChange={e => { handleSortRating(e) }}>
                    <option className="option">sorted by rating</option>
                    <option value="btw"> Best to Worse </option>
                    <option value="wtb"> Worse to Best </option>
                </select>
                <select className="select" onChange={e => { handleFilterRating(e) }}>
                    <option className="option" value="all" >filter by rating</option>
                    <option value="all"> All Games </option>
                    <option value="1"> 1⭐ Games </option>
                    <option value="2"> 2⭐ Games </option>
                    <option value="3"> 3⭐ Games </option>
                    <option value="4"> 4⭐ Games </option>
                    <option value="5"> 5⭐ Games </option>
                </select>
             <select className="select"onChange={e => {handleFilterGenre(e) }}>
                 <option className="option"> by genres</option>
                  <option value= 'All'>All</option>
                  <option value= 'Action'>Action</option>
                  <option value= 'Indie'>Indie</option>
                  <option value= 'Adventure'>Adventure</option>
                  <option value= 'RPG'>RPG</option>
                  <option value= 'Strategy'>Strategy</option>
                  <option value= 'Shooter'>Shooter</option>
                  <option value= 'Casual'>Casual</option>
                  <option value= 'Simulation'>Simulation</option>
                  <option value= 'Puzzle'>Puzzle</option>
                  <option value= 'Arcade'>Arcade</option>
                  <option value= 'Platformer'>Platformer</option>
                  <option value= 'Racing'>Racing</option>
                  <option value= 'Massively Multiplayer'>Multiplayer</option>
                  <option value= 'Sports'>Sports</option>
                  <option value= 'Fighting'>Fighting</option>
                  <option value= 'Family'>Family</option>
                  <option value= 'Board Games'>Board Games</option>
                  <option value= 'Educational'>Educational</option>
                  <option value= 'Card'>Cards</option>
             </select>
             <select className="select" onChange={e => {handleFilterCreated(e) }}>
                  <option className="option">All Videogames</option>
                  <option value= 'All'>All</option>
                  <option value= 'created'>Created</option>
                  <option value= 'api'>Brought from Api</option>
             </select>

             <button className="selectFin" onClick= {(e) => handleClick(e)}>
                    Remove Filters
                </button>
             

                  
              
             <Paginado
              videogamesPerPage= {videogamesPerPage}
              allVideogames= {allVideogames.length}
              paginado= {paginado}
              />


              <div className="cardContainer">
                    {
                        currentVideoGame.length > 0 ? currentVideoGame.map(v =>
                            <Card key={v.id} rating={v.rating} id={v.id} name={v.name} image={v.img ? v.img : imageNotFound} genre={v.genres ? v.genres.map((v, index) => <p key={index}>{v}</p>) : 'N/A'} />

                        ) : <div>
                            <img  className="loading" src={loading} type="png" alt="Loading..." />
                        </div>
                    }
                </div>
                 </div>
         </div>
       )
      }