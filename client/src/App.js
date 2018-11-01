import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';


import Menu from './componets/menu';
import Home from './componets/home';
import './App.css';
import DropOff from './componets/drop_off';


class App extends React.Component {
  constructor() {
    super()
    this.state = {
      lat: 9.0089,
      lng: 38.7629,
      zoom: 16
    }
  }


  render() {
    const position = [this.state.lat, this.state.lng];
    const positionTwo = [9.0092, 38.7645];

    return (
      <div>
        <BrowserRouter>
          <div>
            <Menu />
            <Switch>
                <Route path="/" component={Home} exact />
                <Route path="/drop-off" component={DropOff} />
            </Switch>
          </div>
        </BrowserRouter>  
        
      </div>
      
    );
  }
}

export default App;
