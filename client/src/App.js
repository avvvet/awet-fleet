import React, { Component } from 'react';
import { render} from 'react-dom';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

import './App.css';
import TryMarker from './playground/marker';
import TryEvent from './playground/TryEvent';

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
      
      <TryEvent ></TryEvent>

    );
  }
}

export default App;
