import React, { Component } from 'react';
import {Map, Marker,Popup, TileLayer} from 'react-leaflet';
import {Button} from 'react-bootstrap';
import * as Nominatim from "nominatim-browser";

class DropOff extends Component {
  constructor() {
      super();
      this.state = {
          dropOffFlag: false,
          dropOff: {
              lat: 0,
              lng: 0
          },
          dropOffAdress:'Select your drop off address from the map !'
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
            dropOffAdress: result.display_name
        });
        //console.log(result.display_name); // 'Minneapolis City Hall, South 4th Street, St Anthony West, Phillips, Minneapolis, Hennepin County, Minnesota, 55415, United States of America'
        // result.address is only returned when 'addressdetails: true' is sent in the request
        // console.log(result.address.city);    // 'Minneapolis'
        // console.log(result.address.county);  // 'Hennepin County'
        // console.log(result.address.state);   // 'Minnesota'
        // console.log(result.address.country); // 'United States of America'
    })
    .catch((error) =>
    {
        console.error(error); 
    });

    this.setState({
          dropOff : e.latlng, 
          dropOffFlag: true
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
            <Marker position = {this.state.dropOff}>
                <Popup> distance </Popup>
            </Marker>
            </Map>
           </div>
           <div className="div-pickup">
              <div className="style-1"><h6>Step -2 Drop Off location</h6></div>
              <div className="div-pickup-address">{this.state.dropOffAdress}</div>
              <div className="div-pickup-btn-box"><Button  bsStyle="warning" bsSize="large" block>Request Driver</Button></div> 
              <div className="div-pickup-btn-box"><Button  href="/"  bsSize="large" block>Cancel</Button></div> 
           </div>
        </div>
      );
  }
}
export default DropOff;