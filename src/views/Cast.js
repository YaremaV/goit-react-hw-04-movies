import { useState, useEffect } from 'react';
import * as moviesApi from '../api-service/movies-api';
import s from './SASS/HomeViews.module.scss';

export default function MovieDetailsPage({ movieId }) {
  const [casts, setCasts] = useState([]);

  useEffect(() => {
    moviesApi.fetchMoviesCredits(movieId).then(res => setCasts(res.cast));
  }, [movieId]);

  return (
    <div className={s.casts}>
      {casts && (
        <ul className={s.gallery}>
          {casts.map(cast => (
            <li key={cast.id} className={s.gallery__list}>
              <img
                className={s.gallery__image}
                src={`https://www.themoviedb.org/t/p/w500${cast.profile_path}`}
                alt={cast.original_name}
              />
              <h3 className={s.gallery__title}>{cast.name}</h3>
              <p className={s.gallery__text}>Character: {cast.character}</p>
              <p className={s.gallery__text}>Popularity: {cast.popularity}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
