import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeading from '../Component/Heading/Heading';
// import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import * as moviesApi from '../api-service/movies-api';
import 'react-toastify/dist/ReactToastify.css';

export default function MoviesPage() {
  const [movies, setMovies] = useState('');
  const [searchMovies, setSearchMovies] = useState([]);

  // useEffect(() => {
  //   moviesApi.fetchDetails(movieId).then(setMovies);
  // }, [movieId]);

  const handleImageChange = EventTarget => {
    setMovies(EventTarget.currentTarget.value.toLowerCase());
  };

  const handleSubmit = evt => {
    evt.preventDefault();

    if (movies.trim() === '') {
      toast.error('Please Enter movies name!', {
        position: 'top-left',
        theme: 'colored',
      });
      return;
    }
    moviesApi.fetchSearch(movies).then(res => setSearchMovies(res.results));
    setMovies('');
  };

  return (
    <>
      <PageHeading text="Search Movies" />

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movies"
          value={movies}
          onChange={handleImageChange}
        />
        <button type="submit">
          <span>Search</span>
        </button>
      </form>

      {searchMovies && (
        <ul>
          {searchMovies.map(search => (
            <li key={search.id}>
              <Link to={`/movies/${search.id}`}>{search.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
