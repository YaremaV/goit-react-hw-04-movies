import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import { Route } from 'react-router';
import { useRouteMatch } from 'react-router';
import * as moviesApi from '../api-service/movies-api';
import PageHeading from '../Component/Heading/Heading';
import Casts from './Cast';
import Reviews from './Reviews';

export default function MovieDetailsPage() {
  const { url, path } = useRouteMatch();

  const { movieId } = useParams();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    moviesApi.fetchDetails(movieId).then(setMovies);
  }, [movieId]);

  const poster = `https://www.themoviedb.org/t/p/w500${movies.poster_path}`;
  return (
    <>
      <PageHeading text={movies.title} />
      <button type="button">Back</button>
      {movies && (
        <>
          <img src={poster} alt={movies.title} />
          <h3>{movies.release_date}</h3>
          <p>User score: {movies.vote_average}</p>
          <h3>Overview</h3>
          <p>{movies.overview}</p>
          <h3>Genres</h3>
        </>
      )}
      <hr />
      <h4>Aditional information</h4>
      <ul>
        <li>
          <NavLink to={`${url}/${movieId}/cast`}>Casts</NavLink>
        </li>
        <li>
          <NavLink to={`${url}/${movieId}/reviews`}>Reviews</NavLink>
        </li>
      </ul>

      <Route path={`${path}/cast`}>{movies && <Casts />}</Route>

      <Route path={`${path}/reviews`}>{movies && <Reviews />}</Route>
    </>
  );
}
