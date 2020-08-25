import React, { useState } from 'react';
import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './Login';
import { useStateValue } from './StateProvider';

function App() {
  const [{user},dispatch] = useStateValue();
  return (
    <div className="app">
      {!user ? (
        <Login/>
      ) :
        <div className="app-body">
          <BrowserRouter>
            <Sidebar />
            <Switch>
              <Route exact path="/">
                <Chat />
              </Route>
              <Route path="/rooms/:roomId">
                <Chat />
              </Route>
            </Switch>
          </BrowserRouter>
        </div>
      }
    </div>
  );
}

export default App;
