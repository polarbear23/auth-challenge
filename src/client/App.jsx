import { useEffect, useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes
} from "react-router-dom";
import MovieForm from './components/MovieForm';
import UserForm from './components/UserForm';

const apiUrl = 'http://localhost:4000';

function App() {
  const [movies, setMovies] = useState([]);
  const [response, setResponse] = useState("");

  useEffect(() => {
    fetch(`${apiUrl}/movie`)
      .then(res => res.json())
      .then(res => setMovies(res.data));
  }, []);

  const handleRegister = async ({ username, password }) => {
    fetch(`${apiUrl}/user/register`,{
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username, password})
    })
    console.log("username", username);
    
  };

  const handleLogin = async ({ username, password }) => {
  
    fetch(`${apiUrl}/user/login`,{
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username, password})
    })
    .then(res => res.json())
    .then(res => {
      console.log("response",response); //test response
      if(res.token){
        localStorage.setItem("token", res.token) //store token in localstorage
        setResponse("Login Successful");
      }
      else if(res.error){
        setResponse(res.error);
      }
    })
  };
  
  const handleCreateMovie = async ({ title, description, runtimeMins }) => {
    fetch(`${apiUrl}/movie`,{
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorisation': localStorage.getItem("token")
      },
      body: JSON.stringify({ title, description, runtimeMins })
    })
    .then(res => res.json())
    .then(response => {
      setMovies([...movies, response.createdMovie]);
      console.log("response", response.createdMovie); //test response
    })
  }

  return (
    <Router>
    <div className="App">
      <Link to={"/register"}>Register</Link>
      <br />
      <Link to={"/login"}>Login</Link>
      <br />
      <Link to={"/movie"}>Movie</Link>

      <Routes>
        <Route path={"/register"} element={<UserForm handleSubmit={handleRegister} formType={"register"}/>}/>
        <Route path={"/login"}  element={<UserForm handleSubmit={handleLogin} formType={"login"} />}/>
        <Route path={"/movie"} element={<MovieForm handleSubmit={handleCreateMovie} />}/>
      </Routes>

      {response ? <h2>{response}</h2> : null}
      <h2>Movie list</h2>
      <ul>
        {movies.map(movie => {
          return (
            <li key={movie.id}>
              <h3>{movie.title}</h3>
              <p>Description: {movie.description}</p>
              <p>Runtime: {movie.runtimeMins}</p>
            </li>
          );
        })}
      </ul>
    </div>
   </Router>
  );
}

export default App;