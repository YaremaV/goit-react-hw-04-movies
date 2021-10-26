import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import { Route } from 'react-router';
import { useRouteMatch } from 'react-router';
import * as moviesApi from '../api-service/movies-api';
import PageHeading from '../Component/Heading/Heading';
import Casts from './Cast';
import Reviews from './Reviews';
import s from './SASS/HomeViews.module.scss';

export default function MovieDetailsPage() {
  const { url } = useRouteMatch();
  const { movieId } = useParams();
  const [movies, setMovies] = useState([]);
  const poster = `https://www.themoviedb.org/t/p/w500${movies.poster_path}`;

  useEffect(() => {
    moviesApi.fetchDetails(movieId).then(setMovies);
  }, [movieId]);

  return (
    <main className={s.main}>
      <PageHeading text={movies.title} />
      <button type="button">Back</button>
      {movies && (
        <div className={(s.film__image, s.flex)}>
          <img className={s.image} src={poster} alt={movies.title} />
          <div className={s.film__information}>
            <h3 className={s.film__title}>
              {movies.release_date?.slice(0, 4)}
            </h3>

            <ul className={s.flex}>
              {movies.genres?.map(genre => (
                <li key={genre.id} className={s.film__item}>
                  <p className={s.film__details}>{genre.name}</p>
                </li>
              ))}
            </ul>

            <p className={s.film__details}>User score: {movies.vote_average}</p>
            <h3 className={s.film__title}>Overview</h3>
            <p className={s.film__details}>{movies.overview}</p>
          </div>
        </div>
      )}

      <hr />
      <h4>Additional information</h4>
      <NavLink to={`${url}/cast`}>Casts</NavLink>
      <br />
      <NavLink to={`${url}/reviews`}>Reviews</NavLink>
      <Route path={`${url}/cast`}>
        {movies && <Casts movieId={movieId} />}
      </Route>
      <Route path={`${url}/reviews`}>
        {movies && <Reviews movieId={movieId} />}
      </Route>
    </main>
  );
}
