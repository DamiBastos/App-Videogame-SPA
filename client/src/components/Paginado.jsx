import React from "react";
import '../styles/Paginado.css';

export default function Paginado ({videogamesPerPage, allVideogames, paginado}){
    const pageNumbers = []
      //aca redondeo mis videogames sobre los que tengo por pagina
    for(let i=1; i<=Math.ceil(allVideogames/videogamesPerPage); i++){
        pageNumbers.push(i)
    }

    

    return (
        <div className="paginacion">
            
                {pageNumbers && pageNumbers.map(number => ( 
                    
                        <button key={number} className="btn" onClick={() => paginado(number)}>{number}</button>
                  
                ))}
           
        </div>
    )
}