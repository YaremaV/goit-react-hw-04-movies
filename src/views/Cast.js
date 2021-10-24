import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import * as moviesApi from '../api-service/movies-api';

export default function MovieDetailsPage() {
  const [casts, setCasts] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    moviesApi.fetchMoviesCredits(movieId).then(setCasts);
  }, [movieId]);

  return;
}
