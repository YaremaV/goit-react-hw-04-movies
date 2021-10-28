import { useState, useEffect } from 'react';
import {
  useParams,
  Route,
  useRouteMatch,
  useHistory,
  useLocation,
} from 'react-router';
import { NavLink } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import * as moviesApi from '../api-service/movies-api';
import PageHeading from '../Component/Heading/Heading';
import Button from '../Component/Button/Button';
import Loader from 'react-loader-spinner';
import s from './SASS/HomeViews.module.scss';

const Casts = lazy(() => import('./Cast'));
const Reviews = lazy(() => import('./Reviews'));

export default function MovieDetailsPage() {
  const { url } = useRouteMatch();
  const { movieId } = useParams();
  const [movies, setMovies] = useState([]);
  const history = useHistory();
  const location = useLocation();
  console.log(location);

  useEffect(() => {
    moviesApi.fetchDetails(movieId).then(setMovies);
  }, [movieId]);

  const goBack = () => {
    history.push(location?.state?.from ?? '/');
  };

  return (
    <main className={s.main}>
      <PageHeading text={movies.title} />
      <Button onClick={goBack} />
      {movies && (
        <div className={(s.film__image, s.flex)}>
          <img
            className={s.image}
            src={`https://www.themoviedb.org/t/p/w500${movies.poster_path}`}
            alt={movies.title}
          />
          <div className={s.film__information}>
            <h3 className={s.film__title}>
              {movies.release_date?.slice(0, 4)}
            </h3>

            <h3 className={s.film__title}>Genre</h3>
            <ul className={s.flex}>
              {movies.genres?.map(genre => (
                <li key={genre.id} className={s.film__item}>
                  <p className={s.film__details}>{genre.name}</p>
                </li>
              ))}
            </ul>
            <p className={s.film__details}>
              <strong>Rating:</strong> {movies.vote_average}
            </p>
            <p className={s.film__details}>
              <strong>Overview:</strong> {movies.overview}
            </p>
          </div>
        </div>
      )}

      <hr />
      <h4 className={s.gallery__title}>Additional information</h4>
      <div className={s.flex}>
        <NavLink
          to={{
            pathname: `${url}/cast`,
            state: { from: location },
          }}
        >
          <button type="button" className={s.button}>
            Casts
          </button>
        </NavLink>
        <br />
        <NavLink
          to={{
            pathname: `${url}/reviews`,
            state: { from: location },
          }}
        >
          <button type="button" className={s.button}>
            Reviews
          </button>
        </NavLink>
      </div>
      <Suspense
        fallback={
          <Loader
            type="ThreeDots"
            color="teal"
            height={300}
            width={300}
            timeout={3000}
          />
        }
      >
        <Route path={`${url}/cast`}>
          {movies && <Casts movieId={movieId} />}
        </Route>
        <Route path={`${url}/reviews`}>
          {movies && <Reviews movieId={movieId} />}
        </Route>
      </Suspense>
    </main>
  );
}
