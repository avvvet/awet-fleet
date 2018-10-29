import React, { Component } from 'react';
import { render} from 'react-dom';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';




class TryMarker extends React.Component {
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
      <Map center={position} zoom={this.state.zoom}>
        <TileLayer
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>
            Father holyspirit. <br/> you are looking, <br/> please help the troubled.
          </Popup>
        </Marker>

        <Marker position={positionTwo}>
          <Popup>
            Father holyspirit. <br/> you are looking, <br/> please help the troubled.
          </Popup>
        </Marker>
      </Map>
    );
  }
}

export default TryMarker;
