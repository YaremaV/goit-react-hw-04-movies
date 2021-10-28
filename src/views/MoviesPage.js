import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocation, useHistory } from 'react-router';
import PageHeading from '../Component/Heading/Heading';
// import PropTypes from 'prop-types';
import * as moviesApi from '../api-service/movies-api';
import s from './SASS/HomeViews.module.scss';
import Error from '../Component/Error/Error';
import Searchbar from '../Component/Searchbar/Searchbar';

export default function MoviesPage() {
  const [movies, setMovies] = useState('');
  const [searchMovies, setSearchMovies] = useState([]);
  const [error, setError] = useState(null);
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const queryValue = new URLSearchParams(location.search).get('movies');

    if (queryValue === null) {
      return;
    }

    setMovies(queryValue);
  }, [location.search]);

  useEffect(() => {
    if (movies === '') {
      return;
    }

    moviesApi
      .fetchSearch(movies)
      .then(res => setSearchMovies(res.results))
      .catch(error => {
        setError(error);
      });
  }, [movies]);

  // const handleImageChange = EventTarget => {
  //   setMovies(EventTarget.currentTarget.value.toLowerCase());
  // };

  const handleSubmit = value => {
    history.push({ ...location, search: `movies=${value}` });
    setMovies(value);
  };

  return (
    <main className={s.main}>
      <PageHeading text="Search Movies" />
      <Searchbar onSubmit={handleSubmit} />

      {error && <Error message={error.message} />}

      {searchMovies && (
        <ul className={s.gallery}>
          {searchMovies.map(search => (
            <li key={search.id} className={s.gallery__list}>
              <Link
                to={{
                  pathname: `/movies/${search.id}`,
                  state: { from: location },
                }}
              >
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
