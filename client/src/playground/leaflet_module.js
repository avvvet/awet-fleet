import React, { Component } from 'react';
import { render } from 'react-dom';
import L from 'leaflet';
import GeometryUtil from 'leaflet-geometryutil';
import awet from 'awet-react-leaflet';
import './../App.css';


class LeafLetModule extends Component {
    constructor(){
        super();
        this.state = {
            mapcontainer: ''
        }

    }
    
    componentDidMount(){
        var map = L.map('mapid').setView([51.505, -0.09], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        
        L.marker([51.5, -0.09]).addTo(map)
            .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
            .openPopup();
        
        var marker = L.marker([51.5, -0.09]).addTo(map);
        var circle = L.circle([51.508, -0.11], {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: 500
        }).addTo(map);  
        
        var polygon = L.polygon([
            [51.509, -0.08],
            [51.503, -0.06],
            [51.502, -0.05],
            [51.51, -0.047]
        ]).addTo(map);

        marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
        circle.bindPopup("I am a circle.");
        polygon.bindPopup("I am a polygon.");

        var  _firstLatLng,
             _firstPoint,
             _secondLatLng,
             _secondPoint,
             _distance,
             _length,
             _polyline;

        var popup = L.popup();
        function onMapClick(e) {
            popup
                .setLatLng(e.latlng)
                .setContent("You clicked the map at " + e.latlng.toString())
                .openOn(map);

            if (!_firstLatLng) {
                _firstLatLng = e.latlng;
                _firstPoint = e.layerPoint;
                L.marker(_firstLatLng).addTo(map).bindPopup('Point A<br/>' + e.latlng + '<br/>' + e.layerPoint).openPopup();
            } else {
                _secondLatLng = e.latlng;
                _secondPoint = e.layerPoint;
                L.marker(_secondLatLng).addTo(map).bindPopup('Point B<br/>' + e.latlng + '<br/>' + e.layerPoint).openPopup();
            }

            if (_firstLatLng && _secondLatLng) {
                // draw the line between points
                L.polyline([_firstLatLng, _secondLatLng], {
                color: 'red'
                }).addTo(map);
            
                refreshDistanceAndLength();
            }
        }

        function refreshDistanceAndLength() {
            _distance = L.GeometryUtil.distance(map, _firstLatLng, _secondLatLng);
            _length = L.GeometryUtil.length([_firstPoint, _secondPoint]);
            document.getElementById('distance').innerHTML = _distance;
            document.getElementById('length').innerHTML = _length;
            if (_firstLatLng && _secondLatLng) {
                _firstLatLng = _secondLatLng;
            }
        }
        
        
        map.on('click', onMapClick);
        var latlng1 = L.latLng(50.5, 30.5);
        var latlng2 = L.latLng(50.5, 30.5);
        
        var _distance = GeometryUtil.distance(map, latlng1, latlng2);
        console.log("distance",_distance);
        //var _length = L.GeometryUtil.length([_firstPoint, _secondPoint]);
 
    };
    
    onMapClick(e) {
        return e.latlng;
    }
    
    render(){
    
        return(
            <div>
              <div className="mapid" id="mapid"></div>
              <div id="distance"></div>
              <div id="length"></div>
            </div>
        );
    }
}
export default LeafLetModule;