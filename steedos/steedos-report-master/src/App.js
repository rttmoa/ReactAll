import React from 'react';
import { renderRoutes } from 'react-router-config';
import { Switch } from 'react-router-dom';
import routes from './routes';

import './App.css';

const App = () => (
  <Switch>
    {renderRoutes(routes)}
  </Switch>
);

export default App;
