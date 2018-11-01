import React, { Component } from 'react';
import TryMap from './../playground/TryMap';

class Home extends Component {
    constructor(){
        super();
        this.state = {
            lat:'',
            lng:'',
            bashanka: ''
        }
    }
    
    componentWillMount(){
        this.setState({
            lat: this.props.lat,
            lng: this.props.lat,
            bashanka: 'Jesus I love you'
        })
    }

    render(){
        return(
            <div>
                <TryMap bashanka = {this.state.bashanka}></TryMap>
            </div>
        );
    }
}
export default Home;