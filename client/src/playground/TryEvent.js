import React, { createRef, Component } from 'react'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';



class TryEvent extends Component {
  constructor() {
      super();
      this.state = {
          hasLocation: false,
          latlng: {
            lat: 9.0089,
            lng: 38.7629,
            zoom: 16
          }
      }
  }  

  mapRef = createRef();


  handleClick = () => {
    const map = this.mapRef.current
    if (map != null) {
      map.leafletElement.locate();
    }
  }

  handleLocationFound = (e) => {
    this.setState({
      hasLocation: true,
      latlng: e.latlng,
    })
  }

  render() {
    const marker = this.state.hasLocation ? (
      <Marker position={this.state.latlng}>
        <Popup>You are here</Popup>
      </Marker>
    ) : null

    return (
      <Map
        center={this.state.latlng}
        length={4}
        onClick={this.handleClick}
        onLocationfound={this.handleLocationFound}
        ref={this.mapRef}
        zoom={16}>
        <TileLayer
          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {marker}
      </Map>
    )
  }
}

export default TryEvent;