import React from 'react';
import ReactDOM from 'react-dom';

import { HashRouter as Router, Route } from 'react-router-dom';

import Bookmarks from './routes/Bookmarks';
import MainHud from './routes/MainHud';
import Notes from './routes/Notes';

import './styles/css/index.css';

ReactDOM.render(
  <Router>
    <div>
      <Route exact path="/" component={MainHud} />
      <Route path="/notes" component={Notes} />
      <Route path="/bookmarks" component={Bookmarks} />
    </div>
  </Router>,
  document.getElementById('root')
);

// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();