import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as moviesApi from '../api-service/movies-api';
import PageHeading from '../Component/Heading/Heading';
import s from './SASS/HomeViews.module.scss';

export default function HomeViews() {
  const [popularMovies, setPopularMovies] = useState(null);

  useEffect(() => {
    moviesApi.fetchPopular().then(res => setPopularMovies(res.results));
  }, []);

  return (
    <main className={s.main}>
      <PageHeading text="Popular Movies" />

      {popularMovies && (
        <ul className={s.gallery}>
          {popularMovies.map(popular => (
            <li key={popular.id} className={s.gallery__list}>
              <Link to={`/movies/${popular.id}`}>
                <img
                  className={s.gallery__image}
                  src={`https://www.themoviedb.org/t/p/w500${popular.poster_path}`}
                  alt={popular.title}
                />
                <div className={s.flex}>
                  <h2 className={s.gallery__title}>{popular.title}</h2>
                  <p className={s.gallery__text}>
                    {popular.release_date?.slice(0, 4)}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
