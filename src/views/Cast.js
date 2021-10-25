import { useState, useEffect } from 'react';
import * as moviesApi from '../api-service/movies-api';

export default function MovieDetailsPage({ movieId }) {
  const [casts, setCasts] = useState([]);

  useEffect(() => {
    moviesApi.fetchMoviesCredits(movieId).then(res => setCasts(res.cast));
  }, [movieId]);

  return (
    <>
      {casts && (
        <ul>
          {casts.map(cast => (
            <li key={cast.id}>
              <img
                src={`https://www.themoviedb.org/t/p/w500${cast.profile_path}`}
                alt={cast.original_name}
              />
              <h3>{cast.name}</h3>
              <p>Character: {cast.character}</p>
              <p>Popularity: {cast.popularity}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
