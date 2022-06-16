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
import ArView from "./ArView";
import WebViewer from "./WebViewer";
import BoutiqueView from "./BoutiquesView"
import ProductView from "./ProductView"

/*
 TODO: Insert your API key below
 */
var sharedProps = {
  apiKey:"769B05D2-8F34-457B-BE05-0F0008B68483",
}

// This determines which type of experience to launch in, or UNSET, if the user should
// be presented with a choice of AR or VR. By default, we offer the user a choice.

class DjeknaNav extends Component{
    constructor(props){
        super(props);

        this.state = {
            showAR:'false',
            showWebView:'false',
            showImg:'false'
        }
          
        this._getARNavigator = this._getARNavigator.bind(this);
        this._getBoutiqueNavigator = this._getBoutiqueNavigator.bind(this);
        this._getProductNavigator = this._getProductNavigator.bind(this);
        this._displayWebView = this._displayWebView.bind(this);
        this._displayViewChoice = this._displayViewChoice.bind(this);
        this._getAR = this._getAR.bind(this);
        this._getImg = this._getImg.bind(this);
        this._getWebView = this._getWebView.bind(this);
        this._setStateAR = this._setStateAR.bind(this);
        this._setStateImg = this._setStateImg.bind(this);
        this._setStateWebView = this._setStateWebView.bind(this);

    }

    static navigationOptions = ({ navigation }) => {
      return {
        headerLeft:(
          <Button 
            onPress={() => {
              navigation.goBack()
            }}
            title="Retour"
            color="#fff"
          />
        ),
      };
    };

    componentDidMount(){
      const action = { type: "TOGGLE_AR_TAB", value: 'true' }
      this.props.dispatch(action)
      this.props.navigation.addListener('didFocus', this._onFocus);
      this.props.navigation.addListener('didBlur', this._onBlur);
    }
    
    componentWillUnmount() {
      if(undefined){
        this.props.navigation.removeListener('didBlur', this._onBlur);
        this.props.navigation.removeListener('didFocus', this._onFocus);
      }
    }
    
    _onFocus = () => {
        
    };
    
    _onBlur = () => {
      
    };

    render() {
      return this._getARNavigator();
      /*return (
        <View >
          <Text>AR STUFF</Text>
        </View>
      )*/
    }
    
      // Returns the ViroARSceneNavigator which will start the AR experience
    _getARNavigator() {
        return (
          <View style={localStyles.outer}>
            {this._displayViewChoice()}
            {this._displayWebView()}
            <ArView style = {localStyles.viroContainer} navigation = {this.props.navigation}/>
          </View>
        );
    }

    _getBoutiqueNavigator(){
      return(
        <BoutiqueView/>
      )
    }

    _getProductNavigator(){
      return(
        <ProductView/>
      )
    }

    _displayWebView(){
      const m = this.props.modelFound
        if(m == 'true'){
          return(
            <WebViewer/>
          )
        }
    }

    _displayViewChoice(){
        return(
          <View style={localStyles.displayViewChoiceContainer}>
            {this._getAR()}
            {this._getWebView()}
            {this._getImg()}
          </View>
        )
    }

    _getAR(){
      if(this.props.modelAR != 'false'){
        return(
          <TouchableOpacity onPress={this._setStateAR} style = {localStyles.buttons}>
                  <Text style = {localStyles.buttonText}>
                    AR
                  </Text>
          </TouchableOpacity>
        )
      }
    }

    _getWebView(){
      if(this.props.modelFound != 'false'){
        return(
          <TouchableOpacity onPress={this._setStateWebView} style = {localStyles.buttons}>
              <Text style = {localStyles.buttonText}>
                WB
              </Text>
            </TouchableOpacity>
        )
      }
    }

    _getImg(){
      if(this.props.modelImg != 'false'){
        return(
          <TouchableOpacity onPress={this._setStateImg} style = {localStyles.buttons}>
              <Text style = {localStyles.buttonText}>
                IMG
              </Text>
            </TouchableOpacity>
        )
      }
    }

    _setStateAR(){
      const action = { type: "ACTIVATE_AR", value: 'true' }
      this.props.dispatch(action)

      this.setState({
        showAR:'true',
        showWebView:'false',
        showImg:'false'
      })
    }

    _setStateImg(){
      const action = { type: "ACTIVATE_IMG", value: 'true' }
      this.props.dispatch(action)
      this.setState({
        showAR:'false',
        showWebView:'false',
        showImg:'true'
      })
    }

    _setStateWebView(){
      const action = { type: "ACTIVATE_WV", value: 'true' }
      this.props.dispatch(action)
      this.setState({
        showAR:'false',
        showWebView:'true',
        showImg:'false'
      })
    }
    

}

var localStyles = StyleSheet.create({
    viroContainer :{
      flex : 1,
      position: "absolute",
      zIndex: 2,
    },
    outer : {
      flex : 1,
      justifyContent:'center',
      flexDirection:"row",
      
    },
    inner: {
      position: "absolute",
      alignItems:'center',
      justifyContent:'center',
    },
    titleTextContainer: {
      position: "absolute",
      zIndex: 3,
      //top: 20,
      width: '100%',
      //height:'50%',
      flex : 1,
    },
    titleText: {
      position: "absolute",
      width:'50%',
      zIndex: 3,
    },
    buttonText: {
      color:'#ff0000',
      textAlign:'center',
      fontSize: 20,
      fontWeight: 'bold',
      flex:1,
      flexDirection: "row",
    },
    buttons : {
      height: 80,
      width: 80,
      margin: 20,
      backgroundColor:'#fff',
      borderRadius: 50,
      flex:1,
      flexDirection:"row",
      opacity: .5,
      justifyContent:"center",
      alignItems: "center"
    },
    displayViewChoiceContainer: {
      flex : 1,
      position: "absolute",
      bottom: 15,
      zIndex: 5,
      backgroundColor: 'transparent',
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",

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

export default connect(mapStateToProps)(DjeknaNav)
//module.exports = connect(mapStateToProps)(DjeknaNav)
//module.exports = DjeknaNav