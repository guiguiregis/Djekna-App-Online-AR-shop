import React, { Component } from 'react';
import {
  ViroARSceneNavigator
} from 'react-viro';

import { connect } from 'react-redux'

/*
 TODO: Insert your API key below
 */
var sharedProps = {
  apiKey:"769B05D2-8F34-457B-BE05-0F0008B68483",
}

var InitialARScene = require('./ARscene');

class ArView extends Component {
    constructor(props){
        super(props);

        this.state = {
            sharedProps : sharedProps,
            
        }
        
    }

    render(){
        return(
            <ViroARSceneNavigator {...this.state.sharedProps}
            initialScene={{scene: InitialARScene}} 
            viroAppProps={{navigation:this.props.navigation}}/>
        );
    }
}

const mapStateToProps = (state) => {
    return {
      modelFound: state.modelFound
    }
}

export default connect(mapStateToProps)(ArView)