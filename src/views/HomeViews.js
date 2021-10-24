import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as moviesApi from '../api-service/movies-api';
import PageHeading from '../Component/Heading/Heading';

export default function HomeViews() {
  const [popularMovies, setPopularMovies] = useState(null);

  useEffect(() => {
    moviesApi.fetchPopular().then(res => setPopularMovies(res.results));
  }, []);
  return (
    <>
      <PageHeading text="Popular Movies" />
      {popularMovies && (
        <ul>
          {popularMovies.map(popular => (
            <li key={popular.id}>
              <Link to={`/movies/${popular.id}`}>{popular.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
