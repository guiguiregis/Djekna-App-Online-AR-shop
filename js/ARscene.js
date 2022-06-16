'use strict';

import React, { Component } from 'react';

import {StyleSheet} from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroImage,
  ViroQuad,
  ViroNode,
  ViroCamera,
  ViroVideo,
  ViroMaterialVideo,
  ViroOrbitCamera,
  ViroAnimatedImage,
  ViroConstants,
  ViroARImageMarker,
  ViroARTrackingTargets,
  ViroMaterials,
  ViroButton
} from 'react-viro';

import { connect } from 'react-redux';

var uris = []
var targ = {
  "targetOne" : {
    source : require('./res/qrAfrica.png'),
    orientation : "Up",
    physicalWidth : 1 // real world width in meters
  },
  "targetTwo" : {
    source : require('./res/qrct-SBA002.png'),
    orientation : "Up",
    physicalWidth : 1 // real world width in meters
  }
}

var SecondScene = require('./crossScene');

export default class ARscene extends React.Component {

  constructor(props) {
    super(props);
    uris = [["targetOne","http://18.224.141.179/wp-content/uploads/2018/11/qrAfrica.png","SBA013_00FF00","http://18.224.141.179/wp-content/uploads/2018/11/SBA013_00FF00.mp4","false","false"],
            ["targetTwo","http://18.224.141.179/wp-content/uploads/2018/11/qrct-SBA002.png","SBA002_0000FF","http://18.224.141.179/wp-content/uploads/2018/11/SBA002_0000FF.mp4","false","false"],
            
          ]
    // Set initial state here
    this.state = {
      pauseUpdates: false,
      modelOn:'false',
      modelArOn:'false',
      modelImgOn:'false',
      readyModel:'false',
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
    this._onAnchorFound = this._onAnchorFound.bind(this);
    this._onAnchorRemoved = this._onAnchorRemoved.bind(this);
    this._toggleAction = this._toggleAction.bind(this);
    this._ShowAR = this._ShowAR.bind(this);
    this._filterSelection = this._filterSelection.bind(this);
    this._sendDataForDisplayOption = this._sendDataForDisplayOption.bind(this);
    this._viroDistribution = this._viroDistribution.bind(this);
    this._targetCreation = this._targetCreation.bind(this);
    this._getViroVideo = this._getViroVideo.bind(this);
  }

componentDidMount(){
  this.props.sceneNavigator.viroAppProps.navigation.addListener('didFocus', this._onFocus);
  this.props.sceneNavigator.viroAppProps.navigation.addListener('didBlur', this._onBlur);
}

componentWillUnmount() {
  if(undefined){
    this.props.sceneNavigator.viroAppProps.navigation.removeListener('didBlur', this._onBlur);
  this.props.sceneNavigator.viroAppProps.navigation.removeListener('didFocus', this._onFocus);
  }
}

_onFocus = () => {
  
  this.setState({
    pauseUpdates: false,
      modelOn:'false',
      modelArOn:'false',
      modelImgOn:'false',
      readyModel:'false',
  });
};

_onBlur = () => {
  this.setState({
    pauseUpdates: false,
      modelOn:'false',
      modelArOn:'false',
      modelImgOn:'false',
      readyModel:'false',
  });
  
};

  render() {
    return (
  
      <ViroARScene arOn = {this.props.arshow}  onTrackingUpdated={this._onInitialized} onAnchorRemoved = {this._onAnchorRemoved()}>
        {this._viroDistribution()}

      </ViroARScene>
    );
  }

  _onInitialized(state, reason) {
    //alert('on..')
    if (state == ViroConstants.TRACKING_NORMAL) {
    } else if (state == ViroConstants.TRACKING_NONE) {
    }
  }
  
  _onAnchorFound(ar,img,wv){
    this.setState({
      pauseUpdates : true,
      readyModel:'true',
    });
    this._sendDataForDisplayOption(ar,img,wv)
  }

  _onAnchorRemoved(){
    
  }

  _toggleAction(){
      const action = { type: "TOGGLE_WEBVIEW", value: this.state.modelOn }
      const actionAR = { type: "TOGGLE_AR", value: this.state.modelArOn }
      const actionImg = { type: "TOGGLE_IMG", value: this.state.modelImgOn }
      this.props.dispatch(action)
      this.props.dispatch(actionAR)
      this.props.dispatch(actionImg)
  }

  _filterSelection(modelName){
    var m = ""+modelName
    if(m.search("_00FF00")){
      return "colorMaskG"
    }else if (m.search("_0000FF")){
      return "colorMaskB"
    }
  }

  _viroDistribution(){
    const distribution = uris.map((uri) => 
    <ViroARImageMarker target = {uri[0]}
                        onAnchorFound={() => this._onAnchorFound(uri[3],uri[4],uri[5])}
                        pauseUpdates={this.state.pauseUpdates}
    >
      {this._toggleAction()}
      {this._ShowAR(uri[3],uri[2])}
    </ViroARImageMarker>
    );
    return distribution;
  }

  _sendDataForDisplayOption(ar,img,wv){
    ar = ''+ar
    if(ar != "false"){
      this.setState({
        modelArOn:ar
      })
    }
    if(img != "false"){
      this.setState({
        modelImgOn:img
      })
    }
    if(wv != "false"){
      modelOn:wv
    }
    //this._toggleAction()
  }

  /*
  * Get the appropriate AR given the proper QR 
  */
  _ShowAR(link,modelName){

    if(this.state.readyModel == 'true' && this.props.activateAR == 'true'){
      
      return(
        <ViroNode styles={localstyles.viroNodeContainer}
          position={[0,0,0]}
          rotation={[0, 0, 0]}
          scale={[1,1,1]}>
          {this._getViroVideo(link,modelName)}
          
        </ViroNode>
      )
    }
  }

  _getViroVideo(link,modelName){
    return(
      <ViroVideo
            source={{uri:link}}
            //source = {require("./res/SBA008_D_24fps.mp4")}
            paused = {false}
            renderingOrder= {2}
            visible = {true}
            transformBehaviors = {'billboard'}
            position={[0,0,-1]}
            scale={[2.5,2.5,2.5]}
            loop={true}
            materials={[this._filterSelection(modelName)]}
    />
    )
  }

  _targetCreation(){
    const targets = []
    const uri = {}
    const source = {}
    const orientation = "Up"
    const physicalWidth = 1
    const data = {source,orientation,physicalWidth}
    const target = {data}
    uris.map((uri) =>
      {
        source
      }
    );
    return targets;
  }

}

ViroARTrackingTargets.createTargets(targ);

ViroMaterials.createMaterials({
  colorMaskG : {
    chromaKeyFilteringColor: "#00FF00",
  },
  colorMaskB : {
    chromaKeyFilteringColor: "#0000FF",
  }
});

const mapStateToProps = state => {
  return {
    modelFound: state.modelFound,
    modelAR: state.modelAR,
    modelImg: state.modelImg,
    activateAR: state.activateAR
  }
}

var localstyles = StyleSheet.create({
  viroNodeContainer:{
    opacity:0,
  }
});

module.exports = connect(mapStateToProps)(ARscene)
/*
<ViroVideo
            source={{uri:link}}
            //source = {require("./res/SBA008_D_24fps.mp4")}
            paused = {false}
            renderingOrder= {2}
            visible = {true}
            transformBehaviors = {'billboard'}
            position={[0,0,-1]}
            scale={[2.5,2.5,2.5]}
            loop={true}
            materials={[this._filterSelection(modelName)]}
          />

          <ViroButton
            source={require("./res/300ppi/scanEye.png")}
            gazeSource={require("./res/300ppi/scanEye.png")}
            tapSource={require("./res/300ppi/scanEye.png")}
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
            scale={[0.5,0.5,0.5]}
            height={0.5}
            width={1}
            transformBehaviors = {'billboard'}
            
            onTap={() => this._onButtonTap(link,modelName)}
          />
*/
