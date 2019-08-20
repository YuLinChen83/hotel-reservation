import React, { Suspense } from 'react';
import history from 'historyConfig';
import Header from 'components/Header';
import { Switch, Route, Router } from 'react-router-dom';
import RoomlList from 'components/RoomlList';
import RoomInfo from 'components/RoomInfo';
import Footer from 'components/Footer';
import './App.scss';

const App = () => (
  <div className="container">
    <Header />
    <div className="main">
      <Router history={history}>
        <Suspense fallback={null}>
          <Switch>
            <Route path="/room/:id" component={RoomInfo} />
            <Route path="/" component={RoomlList} />
          </Switch>
        </Suspense>
      </Router>
    </div>
    <Footer />
  </div>
);

export default App;
