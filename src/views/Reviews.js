import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import * as moviesApi from '../api-service/movies-api';

export default function MovieDetailsPage() {
  const [reviews, setReviews] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    moviesApi.fetchMoviesReviews(movieId).then(setReviews);
  }, [movieId]);

  return;
}
