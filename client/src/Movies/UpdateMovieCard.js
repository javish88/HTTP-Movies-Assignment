import React, {useState, useEffect} from 'react'
import axios from 'axios'

const UpdateMovieCard = props => {
    const [movie, setMovie] = useState({
      title: "",
      director: "",
      metascore: 0,
      stars: []
    });
    const id = props.match.params.id;
  
    useEffect(() => {
      axios
        .get(`http://localhost:5000/api/movies/${id}`)
        .then(res => setMovie(res.data))
        .then(res => console.log("res", res.data))
        .catch(err => console.log(err));
    }, []);
  
    const changeHandler = e => {
      e.preventDefault();
      setMovie({
        ...movie,
        [e.target.name]: e.target.value
      });
    };
  
    const handleSubmit = e => {
      e.preventDefault();
      axios
        .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
        .then(res => {
          console.log(res);
          setMovie(res.data);
          props.history.push(`/movies/${movie.id}`);
        })
        .catch(err => {
          console.error(err);
        });
    };
  
    return (
      <div className="movie-card">
        <h1>Update Movie Card!!!</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={movie.title}
            onChange={changeHandler}
          />{" "}
          <br />
          <input
            type="text"
            name="director"
            placeholder="Director"
            value={movie.director}
            onChange={changeHandler}
          />
          <br />
          <input
            type="text"
            name="metascore"
            placeholder="Metascore"
            value={movie.metascore}
            onChange={changeHandler}
          />
          <br />
          <input
            type="text"
            name="stars"
            placeholder="stars"
            value={movie.stars}
            onChange={changeHandler}
          />
          <br />
          <button> Submit </button>
        </form>
      </div>
    );
  };

  export default UpdateMovieCard;

  