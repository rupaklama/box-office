import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Starred from './pages/Starred';
import Show from './pages/Show';

// Switch component is like switch statement in js where every case is the path we specify.
// If we don't have exact match, we have default operation or route with 404 page.

// <Switch /> component will only render the first route that matches/includes the path.
// Once it finds the first route that matches the path, it will not look for any other matches.
// Not only that, it allows for nested routes to work properly, which is something
// that <Router /> will not be able to handle.

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/starred">
          <Starred />
        </Route>
        <Route exact path="/show/:id">
          <Show />
        </Route>
        <Route>
          <div>Not found</div>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
