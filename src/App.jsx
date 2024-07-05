import { Switch, Route } from 'react-router-dom';

export default function App() {
  return (
    <main>
      <Switch>
        <Route path='/' exact>
          Hello world
        </Route>
        <Route>Not found</Route>
      </Switch>
    </main>
  );
}
