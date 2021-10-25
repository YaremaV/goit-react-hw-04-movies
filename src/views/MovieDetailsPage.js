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
        <div className={s.flex}>
          <img className={s.image} src={poster} alt={movies.title} />
          <div>
            <h3>{movies.release_date}</h3>
            <p>User score: {movies.vote_average}</p>
            <h3>Overview</h3>
            <p>{movies.overview}</p>
            <h3>Genres</h3>
          </div>
        </div>
      )}
      <hr />
      <h4>Aditional information</h4>

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
