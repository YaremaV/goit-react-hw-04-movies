import { Route, Switch } from 'react-router';
import { lazy, Suspense } from 'react';
import AppBar from './Component/AppBar/AppBar';
import Container from './Component/Container/Container';
import './App.scss';
import { ToastContainer } from 'react-toastify';
import Loader from 'react-loader-spinner';

const HomeViews = lazy(() => import('./views/HomeViews'));
const MoviesPage = lazy(() => import('./views/MoviesPage'));
const MovieDetailsPage = lazy(() => import('./views/MovieDetailsPage'));

export default function App() {
  return (
    <Container>
      <AppBar />

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
        <Switch>
          <Route path="/" exact>
            <HomeViews />
          </Route>

          <Route path="/movies" exact>
            <MoviesPage />
          </Route>

          <Route path="/movies/:movieId">
            <MovieDetailsPage />
          </Route>
        </Switch>
      </Suspense>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Container>
  );
}
