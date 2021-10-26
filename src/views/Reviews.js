import { useState, useEffect } from 'react';
import * as moviesApi from '../api-service/movies-api';
import s from './SASS/HomeViews.module.scss';

export default function MovieDetailsPage({ movieId }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    moviesApi.fetchMoviesReviews(movieId).then(res => setReviews(res.results));
  }, [movieId]);

  return (
    <>
      {reviews && (
        <ul className={s.reviews__list}>
          {reviews.map(review => (
            <li key={review.id} className={s.reviews__item}>
              <h3 className={s.gallery__title}>{review.author_details.name}</h3>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
