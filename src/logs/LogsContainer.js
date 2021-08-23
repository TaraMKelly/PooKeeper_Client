import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LogsToolBar from './LogsToolBar';

function LogsContainer() {
  return (
    <div className="w-4/5 mx-auto pt-12">
      <LogsToolBar />
      <Switch>
        <Route exact path="/logs"></Route>
        <Route exact path="/logs/new"></Route>
        <Route exact path="/logs/:id"></Route>
        {/* <Route exact path="/logs/:id/add_animals"></Route> */}
      </Switch>
    </div>
  );
}

export default LogsContainer;