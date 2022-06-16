import React, { Component } from 'react';
//import Navigation from "./Navigation";

import {
    WebView,
    StyleSheet,
    View,
    Button,
} from 'react-native';

//import { connect } from 'react-redux'

//import { toggleModel } from "./action/Actions";
//import { bindActionCreators } from "redux";

var _iFrame = '<iframe  width="100%" height="90%" frameborder="0" allowfullscreen mozallowfullscreen="true" webkitallowfullscreen="true" style="border:0;borderRadius:15;" src="https://api.cappasity.com/api/player/0dd9aab0-0cdf-4034-b076-effc7d30b0f0/embedded?autorun=1&closebutton=0&logo=0&autorotate=0&autorotatetime=10&autorotatedelay=2&autorotatedir=1&hidefullscreen=1&hideautorotateopt=1&hidesettingsbtn=1&enableimagezoom=1&zoomquality=2&hidezoomopt=1" ></iframe>'

class WebViewer extends Component{
    constructor(props){
        super(props)

        this.state = {

        };
    }

    render(){
        return(
            <View style = {localStyles.webViewContainer} >
                
              <WebView 
                originWhitelist={['*']}
                source={{ html: _iFrame }}
                style={{flex:1,}}
              />
            </View>
        )
    }
}

var localStyles = StyleSheet.create({
    webViewContainer :{
        flex : 1,
        width: '100%',
        height:'60%',
        position: "absolute",
        zIndex: 4,
        //backgroundColor: 'transparent',
      },
})

export default WebViewer