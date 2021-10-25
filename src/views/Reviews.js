import { useState, useEffect } from 'react';
import * as moviesApi from '../api-service/movies-api';

export default function MovieDetailsPage({ movieId }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    moviesApi.fetchMoviesReviews(movieId).then(res => setReviews(res.results));
  }, [movieId]);

  return (
    <>
      {reviews && (
        <ul>
          {reviews.map(review => (
            <li key={review.id}>
              <h3>{review.author_details.name}</h3>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
