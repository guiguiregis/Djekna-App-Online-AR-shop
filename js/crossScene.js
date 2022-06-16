'use strict';

import React, { Component } from 'react';

import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  PixelRatio,
  TouchableHighlight,
  TouchableOpacity,
  Button,
  WebView,
  Animated,
} from 'react-native';
import { connect } from 'react-redux'

import {
  ViroUtils,
} from 'react-viro'

var isARSupportedOnDevice = ViroUtils.isARSupportedOnDevice;

export default class crossScene extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
          isARSupported:false
        }

        this._handleARNotSupported = this._handleARNotSupported.bind(this)
        this._handleARSupported = this._handleARSupported.bind(this)
    }


      componentDidMount(){
        isARSupportedOnDevice(this._handleARNotSupported, this._handleARSupported);
        this.props.navigation.addListener('didFocus', this._onFocus);
        this.props.navigation.addListener('didBlur', this._onBlur);
      }
      
      componentWillUnmount() {
        this.props.navigation.removeListener('didBlur', this._onBlur);
        this.props.navigation.removeListener('didFocus', this._onFocus);
      }
      
      _onFocus = () => {
        const actionAAR = { type: "ACTIVATE_AR", value: 'false' };
        const actionAWB = { type: "ACTIVATE_WB", value: 'false' };
        const actionAImg = { type: "ACTIVATE_IMG", value: 'false' };
        const actionWB = { type: "TOGGLE_WEBVIEW", value: 'false' }
        const actionAR = { type: "TOGGLE_AR", value: 'false' }
        const actionImg = { type: "TOGGLE_IMG", value: 'false' }
        //const actionImg = { type: "TOGGLE_AR_TAB", value: 'false' }
        this.props.dispatch(actionWB)
        this.props.dispatch(actionAR)
        this.props.dispatch(actionImg)
        this.props.dispatch(actionAWB)
        this.props.dispatch(actionAAR)
        this.props.dispatch(actionAImg)

        if(this.props.arTab == 'false'){
          this.props.navigation.navigate('DjeknaView')
        }else if(this.props.arTab == 'true'){
          this.props.navigation.navigate('Produits')
        }
      };
      
      _onBlur = () => {
        const actionAAR = { type: "ACTIVATE_AR", value: 'false' };
        const actionAWB = { type: "ACTIVATE_WB", value: 'false' };
        const actionAImg = { type: "ACTIVATE_IMG", value: 'false' };
        const actionWB = { type: "TOGGLE_WEBVIEW", value: 'false' }
        const actionAR = { type: "TOGGLE_AR", value: 'false' }
        const actionImg = { type: "TOGGLE_IMG", value: 'false' }
        this.props.dispatch(actionWB)
        this.props.dispatch(actionAR)
        this.props.dispatch(actionImg)
        this.props.dispatch(actionAWB)
        this.props.dispatch(actionAAR)
        this.props.dispatch(actionAImg)
      };

      _handleARSupported() {
        this.setState({
          isARSupported:true
        })
      }
      _handleARNotSupported(reason) {
        this.setState({
          isARSupported:false
        })
      }
      

    render() {
        if(this.state.isARSupported){
          return (
            <View style={localStyles.container}>
              <Text>Profitez de l'experience AR de Djekna.com </Text>
            </View>
          );
        }else{
          return (
            <View style={localStyles.container}>
              <Text>Nous somme navré l'experience AR n'est pas encore disponible sur votre appareil</Text> 
            </View>
          );
        }
        
      }
}

var localStyles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  }
})

const mapStateToProps = state => {
  return {
    modelFound: state.modelFound,
    modelAR: state.modelAR,
    modelImg: state.modelImg,
    activateAR: state.activateAR,
    arTab : state.arTab,
  }
}

module.exports = connect(mapStateToProps)(crossScene)