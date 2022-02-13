import React, { useState, useEffect } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { postVideogame, getGenres } from '../actions/index'
import { useDispatch, useSelector } from 'react-redux';
import '../styles/VideogameCreate.css';

function validate(input) {
    let errors = {};
    if (!input.name) {
        errors.name = 'Required';
    } 
     if (!input.description) {
        errors.description = 'Required ';
    }
      if (!input.released) {
        errors.released = 'Required';
    }
     if (!input.rating) {
        errors.rating = 'Required ';
    }
    
    return errors
}


export default function VideoGameCreate() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const genres = useSelector((state) => state.genres) //me traigo los generos
    const [errors, setErrors] = useState({});

    const [input, setInput] = useState({ //me creo un estado para lo que necesita el post
        name: "",
        description: "",
        released: "",
        rating: "",
        platforms: [],
        image: "",
        genres: []
    });
    
     //cada vez que se modifiquen en mi input
    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    function handleCheck(e) {

        setInput({
            ...input,
            rating: e.target.value
            
        })
        

        setErrors(validate({
            ...input,
            rating: e.target.value
            

        }))
      }

        function handleSelect(e) {
            setInput({
                ...input,
                genres: [...input.genres, e.target.value]
                
            })
        }

        


    function handleSelectPlatform(e) {
        setInput({
            ...input,
            platforms: [...input.platforms, e.target.value]
            })
        }

        function handleDelete(g) {
            setInput({
                ...input,
                genres: input.genres.filter(genre => genre !== g)
            })
        }    

        function handleDeleteP(p) {
            setInput({
                ...input,
                platforms: input.platforms.filter(plat => plat !== p)
            })
        }    

        function handleSubmit(e) {
            if(input.name === "" || input.description === "" || input.rating === "" || input.released === ""){
                e.preventDefault()
                alert("Please complete all required fields")
            } else{
    
                e.preventDefault()
                // console.log(input)
                dispatch(postVideogame(input))
                alert("Videogame successfully created");
                setInput({
                    name: "",
                    description: "",
                    released: "",
                    rating: "",
                    platforms: [],
                    image: "",
                    genres: []
                })
                navigate('/home');  
            }
                
        }

   
    useEffect(() => {
        dispatch(getGenres())
    }, [dispatch]);

    

    return (
        <div className="create">
                <Link to='/home'>
                    <button className="buttonToHome">Back to Home</button>
                </Link>
                <h1>Create your own video game!</h1>
           <div className="form">
            <form  onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>Name:</label>
                    <input
                    className="inputCreate"
                    type= "text"
                    placeholder= "Enter your Videogame name..."
                    value= {input.name}
                    name= "name"
                    onChange={(e) => handleChange(e)}
                    />
                    {errors.name && <p>{errors.name}</p>
                        }
                </div>

                <div> 
                    <label  className="inputRating">Rating:</label>
                        <div >
                            <label >
                                <input
                                    
                                    
                                    type="checkbox"
                                    value="1"
                                    name="1"
                                    onChange={(e) => handleCheck(e)}
                                />1⭐</label>
                            <label>
                                <input

                                    type="checkbox"
                                    value="2"
                                    name="2"
                                    onChange={(e) => handleCheck(e)}
                                />2⭐</label>
                            <label>
                                <input

                                    type="checkbox"
                                    value="3"
                                    name="3"
                                    onChange={(e) => handleCheck(e)}
                                />3⭐</label>
                            <label>
                                <input

                                    type="checkbox"
                                    value="4"
                                    name="4"
                                    onChange={(e) => handleCheck(e)}
                                />4⭐</label>
                            <label>
                                <input

                                    type="checkbox"
                                    value="5"
                                    name="5"
                                    onChange={(e) => handleCheck(e)}
                                />5⭐</label>
                        </div>
                            {errors.rating && 
                           <p> {errors.rating}</p>
                            }
                 </div>

                 <div className="gameCreate"> 
                        <label >Select The Platforms:</label>
                            
                                 <select onChange={(e) => handleSelectPlatform(e)}>
                                <option> Platforms...</option>
                                <option value="PC" name="PC">PC</option>
                                <option value="iOS" name="PC">iOS</option>
                                <option value="Linux" name="PC">Linux</option>
                                <option value="Android" name="PC">Android</option>
                                <option value="Play Station 5" name="Play Station 5">Play Station 5</option>
                                <option value="Xbox Series X" name="Xbox Series X">Xbox Series X</option>
                                <option value="Nintendo Switch" name="Nintendo Switch">Nintendo Switch</option>
                                <option value="Play Station 4" name="Play Station 4">Play Station 4</option>
                                <option value="Xbox One" name="Xbox One">Xbox One</option>
                                <option value="Nintendo Wii U" name="Nintendo Wii U">Nintendo Wii U</option>
                                <option value="Play Station 3" name="Play Station 3">Play Station 3</option>
                                <option value="Xbox 360" name="Xbox 360">Xbox 360</option>
                                <option value="Nintendo Wii" name="Nintendo Wii">Nintendo Wii</option>
                                </select>
                                {input.platforms.map(plat =>
                                <ul className="d" key={plat}>
                                    
                                    <li>{plat}
                                    <button  className="btndelete"  onClick={() => handleDeleteP(plat)}>x</button>
                                    </li> 
                                 </ul>
                            )} 
                    </div>

                        <div className="gameCreate"> 
                            <label >Select The Genres:</label>
                            <select onChange={(e) => handleSelect(e)}>
                                <option> Genres...</option>
                                {genres.map((g) => (
                                    <option key={g.id} value={g.name}>{g.name}</option>
                                ))}
                            </select>
                            {input.genres.map(g =>
                                <ul className="genre" key={g}>
                                    <li>{g}
                                
                                    <button  className="btndelete" onClick={() => handleDelete(g)}>x</button>
                                    </li>
                                    </ul>   
                            )}
                            
                        </div>

                        <div className="labelInstr"> 
                            <label>Release Date:</label>
                            <input
                            placeholder="Enter the Release Date..."
                                type="text"
                                className="instructionDate"
                                rows="5"
                                value={input.released}
                                name="released"
                                onChange={(e) => handleChange(e)}
                            />
                            {errors.released && (
                                <p className="error">{errors.released}</p>
                            )}
                        </div>
                        
                        <div> 
                            <label >Image:</label>
                            <input
                            placeholder="Enter the Image URL..."
                            className="inputCreate"
                            type="text"
                            value={input.image}
                            name="image"
                            onChange={(e) => handleChange(e)}
                            />
                        </div> 

                        <div> 
                            <label  className="label">Description:</label>
                            <textarea
                                placeholder="Enter a Description..."
                                type="text"
                                className="instruction"
                                rows="5"
                                value={input.description}
                                name="description"
                                onChange={(e) => handleChange(e)}
                            />
                            {errors.description && (
                                <p className="error">{errors.description}</p>
                            )}
                       </div>
                            <button className="btnCreate" type="submit">
                            Game Create
                        </button> 
                        </form>
        </div>
        </div>
    )}