import { Route, Switch } from 'react-router';
import AppBar from './Component/AppBar/AppBar';
import Container from './Component/Container/Container';
import './App.css';

export default function App() {
  return (
    <Container>
      <AppBar />
      <Route></Route>
    </Container>
  );
}
