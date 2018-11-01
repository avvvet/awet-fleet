import React, { Component } from 'react';
import {Map, Marker,Popup, TileLayer} from 'react-leaflet';
import {Button} from 'react-bootstrap';
import * as Nominatim from "nominatim-browser";

class TryMap extends Component {
  constructor() {
      super();
      this.state = {
          placeToGoFlag: false,
          placeToGo: {
              lat: 0,
              lng: 0
          },
          pickupAdress:''

      }
  }

  handleClick = (e) => {
    Nominatim.reverseGeocode({
        lat: e.latlng.lat,
        lon: e.latlng.lng,
        addressdetails: true
    })
    .then((result : NominatimResponse) =>
    {
        this.setState({
            pickupAdress: result.display_name
        });
        console.log(result.display_name); // 'Minneapolis City Hall, South 4th Street, St Anthony West, Phillips, Minneapolis, Hennepin County, Minnesota, 55415, United States of America'
        
        // result.address is only returned when 'addressdetails: true' is sent in the request
        console.log(result.address.city);    // 'Minneapolis'
        console.log(result.address.county);  // 'Hennepin County'
        console.log(result.address.state);   // 'Minnesota'
        console.log(result.address.country); // 'United States of America'
    })
    .catch((error) =>
    {
        console.error(error); 
    });

    this.setState({
          placeToGo : e.latlng, 
          placeToGoFlag: true
    })
  }

  render() {
    const position = [9.0092, 38.7645];


      return(
       <div>
           <div className="div-map">
            <Map 
            center = {position} 
            zoom = {17}
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
           <div className="div-pickup">
              <div className=""><h6>Pick Up Location</h6></div>
              <div className="div-pickup-address">{this.state.pickupAdress}</div>
              <div className="div-pickup-btn-box"><Button  bsStyle="success" bsSize="large" block>Continue</Button></div> 
           </div>
        </div>
      );
  }
}
export default TryMap;