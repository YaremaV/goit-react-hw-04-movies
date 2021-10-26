import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeading from '../Component/Heading/Heading';
// import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import * as moviesApi from '../api-service/movies-api';
import 'react-toastify/dist/ReactToastify.css';
import s from './SASS/HomeViews.module.scss';
import Error from '../Component/Error/Error';

export default function MoviesPage() {
  const [movies, setMovies] = useState('');
  const [searchMovies, setSearchMovies] = useState([]);
  const [error, setError] = useState(null);

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
    moviesApi
      .fetchSearch(movies)
      .then(res => setSearchMovies(res.results))
      .catch(error => {
        setError(error);
      });
    setMovies('');
  };

  return (
    <main className={s.main}>
      <PageHeading text="Search Movies" />

      <form onSubmit={handleSubmit} className={s.SearchForm}>
        <input
          className={s.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movies"
          value={movies}
          onChange={handleImageChange}
        />
        <button type="submit" className={s.SearchFormButton}>
          <span className={s.SearchFormButtonLabel}>Search</span>
        </button>
      </form>

      {error && <Error message={error.message} />}

      {searchMovies && (
        <ul className={s.gallery}>
          {searchMovies.map(search => (
            <li key={search.id} className={s.gallery__list}>
              <Link to={`/movies/${search.id}`}>
                <img
                  className={s.gallery__image}
                  src={`https://www.themoviedb.org/t/p/w500${search.poster_path}`}
                  alt={search.title}
                />
                <div className={s.flex}>
                  <h2 className={s.gallery__title}>{search.title}</h2>
                  <p className={s.gallery__text}>
                    {search.release_date.slice(0, 4)}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
