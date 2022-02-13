import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetails } from '../actions/index';
import { useEffect } from 'react';
import { resetDetail } from '../actions/index';
import loading from '../media/loading.png';
import imageNotFound from '../media/imageNotFound.png';
import { useParams } from 'react-router';
import  '../styles/Detail.css';





export default function Detail() {

    
    const dispatch = useDispatch();

    const { id } = useParams();
  
    useEffect(() => {
      dispatch(getDetails(id));
    }, [id, dispatch]);

    

    const myVideogame = useSelector((state) => state.detail)
    console.log(myVideogame)

    return (
        <div >
            <div  className="navbar">
                 <Link to='/home' className="link"><h1 className="logo">Game<span className="logo2">BOX</span></h1></Link>
                 <Link to='/home'><button  className="btnDetail">Previous Stage</button></Link>
            </div>
       
             {
                myVideogame.length > 0 ?

                    <div key={myVideogame[0].id} className="containerDetail" >
                         
                         <div className="son1">
                                <h2>{myVideogame[0].name}</h2>
                        </div>

                         <div >
                            <img className="imgDetail" src={myVideogame[0].img ? myVideogame[0].img : imageNotFound/* myVideogame[0].image */} alt=""  />
                        </div>
                        
                        <div  >
                            <div className="son2">
                                <h3>Genres:</h3>
                                
                                <div className='son3'>{myVideogame[0].genres ? myVideogame[0].genres.map((g, index) => <p key={index}>{g}</p>) : 'No Genres Available'}
                            </div>

                            

                            <div className="son2">
                                <h3 >Platforms: </h3>
                                <div className='son3'>{myVideogame[0].platforms ? myVideogame[0].platforms.map((g, index) => <p key={index}>{g}</p>)  : 'No Platforms available'}</div>
                            </div>
                             <div>
                                <div>
                                <h3>Rating: </h3>
                                <p >{myVideogame[0].rating}</p>
                             
                                <h3>Release Date:</h3>
                                <p S>{myVideogame[0].released}</p>
                            </div>
                        </div>
                    </div>
                    </div>
                    
                         <p className="description">{myVideogame[0].description?.replace(/<[^>]*>?/g, '')}</p>
                      </div>

             : <img src={loading}type="jpeg" alt="Loading..." />
        }
                   
                         
            
                   
    </div>
    )
}