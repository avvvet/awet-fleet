import React, { Component } from 'react';
import { render } from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';



import Menu from './componets/menu';

import './App.css';
import PickUp from './componets/pick_up';
import DropOff from './componets/drop_off';
import Test from './playground/Test';

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
                <Route path="/" component={PickUp} exact />
                <Route path="/drop-off" render={()=><DropOff/>} />
            </Switch>
          </div>
        </BrowserRouter>  
        
      </div>
      
    );
  }
}

export default App;
