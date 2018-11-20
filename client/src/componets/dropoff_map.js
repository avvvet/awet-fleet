import React, { Component } from 'react';
import { render } from 'react-dom';
import L from 'leaflet';
import {Button, Badge, Grid, Row, Col} from 'react-bootstrap';
import * as Nominatim from "nominatim-browser";
import GeometryUtil from 'leaflet-geometryutil';
import {Routing} from 'leaflet-routing-machine';

class DropOffMap extends Component {
    constructor(){
        super();
        this.state = {
            dropoff_flag: false,
            pickup_flag: true,
            dropoff_location : 'Select your pickup location',
            dropoff_latlng : {
                lat: 9.0092,
                lng: 38.7545
            },
            pickup_latlng : {
                lat: 9.0092,
                lng: 38.7645
            },
            map : '',
            markersLayer: ''
        }
    }

    componentDidMount(){
        var map = L.map('mapid').setView([9.0092, 38.7645], 16);
        this.setState({map : map});

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        var markersLayer = new L.LayerGroup().addTo(map);
        this.setState({markersLayer: markersLayer});
        this.setState({pickup_latlng: JSON.parse(localStorage.getItem("session_pickup"))});
    };

    componentDidUpdate(){
        var map = this.state.map;
        var marker;
        var markersLayer = this.state.markersLayer;
        
        map.on('click', (e) => {
            Nominatim.reverseGeocode({
                lat: e.latlng.lat,
                lon: e.latlng.lng,
                addressdetails: true
            })
            .then((result : NominatimResponse) =>
            {
                markersLayer.clearLayers();
                marker = L.marker(e.latlng).addTo(markersLayer).bindPopup("<div class='popup-title'> Your dropoff location is </div>" + "<div class='popup-content'>" + result.display_name + "</div>" ).openPopup();
                markersLayer.addLayer(marker); 
                this.setState({
                    dropoff_location: result.display_name,
                    dropoff_latlng : e.latlng, 
                    dropoff_flag: true,
                });
            })
            .catch((error) =>
            {
                console.error(error); 
            });        
        }); 

        if(this.state.dropoff_flag && this.state.pickup_flag) {
            var latlng1 = this.state.pickup_latlng;
            var latlng2 = this.state.dropoff_latlng;
            refreshDistanceAndLength(latlng1, latlng2);
        }

        function refreshDistanceAndLength(latlng1, latlng2){
            var _distance = GeometryUtil.distance(map, latlng1, latlng2);
            _distance = Number.parseFloat(_distance/1000).toFixed(2);
            
            var price_per_km = 25;
            var _ride_price = Number.parseFloat(_distance * price_per_km).toFixed(2);

            document.getElementById('ride_price').innerHTML = _ride_price + ' Birr';
            document.getElementById('distance').innerHTML = _distance + ' km';

            //routing 
            L.Routing.control({
                waypoints: [
                 latlng1,
                 latlng2
                ]
            }).addTo(map);  
        }    
    }
    
    render(){    
        return(
            
            <div>
              <div className="mapid" id="mapid"></div>
                <div className="div-pickup">
                <div>
                  <Grid fluid={true}>
                      <Row>
                          <Col xs={6} md={6}>
                            Price <Badge><div id="ride_price"></div></Badge>   
                          </Col>

                          <Col xs={6} md={6}>
                           Distance <Badge><div id="distance"></div></Badge>
                          </Col>
                      </Row>
                  </Grid>
                  </div>
                  <div className="div-pickup-btn-box"><Button href="/drop-off" bsStyle="success" bsSize="large" block>Request Driver</Button></div> 
              </div>
            </div>
        );
    }
}
export default DropOffMap;