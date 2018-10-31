import React, { Component } from 'react';
import {Map, Marker,Popup, TileLayer} from 'react-leaflet';

class TryMap extends Component {
  constructor() {
      super();
      this.state = {
          placeToGoFlag: false,
          placeToGo: {
              lat: 0,
              lng: 0
          }
      }
  }

  handleClick = (e) => {
    this.setState({
          placeToGo : e.latlng, 
          placeToGoFlag: true
    })
  }

  render() {
    const position = [9.0092, 38.7645];

      return(
       <div>
           <div>
            <Map 
            center = {position} 
            zoom = {16}
            onClick = {this.handleClick}
            >
            <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position = {this.state.placeToGo}>
                <Popup> distance </Popup>
            </Marker>
            </Map>
           </div>
           <div>Selected Pickup location : {this.state.placeToGo.lat} : {this.state.placeToGo.lng}</div>
        </div>
      );
  }
}
export default TryMap;