import React, { Component } from 'react';
//import Navigation from "./Navigation";

import {
    WebView,
    StyleSheet,
    View,
    Text,
    Button,
} from 'react-native';
import { connect } from 'react-redux'

class BoutiqueView extends React.Component {
    constructor(props){
        super(props)

    
    }

    render(){
        return(
            <View>
                <Text>boutique</Text>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
      modelFound: state.modelFound,
      modelAR: state.modelAR,
      modelImg: state.modelImg,
      activateAR: state.activateAR,
      arTab : state.arTab,
    }
}

export default connect(mapStateToProps)(BoutiqueView)