import React, { Component } from 'react';
import { createStore } from "redux";
import {
    AppRegistry,
    Text,
    View,
    StyleSheet,
    PixelRatio,
    TouchableHighlight,
    Button,
  } from 'react-native';

class ReduxDemo extends Component{
    render(){

        const reducer = function(state, action){
            if(action.type === 'TOGGLE_WEBVIEW'){
                return action.payload;
            }
            return state;
        }

        const store = createStore(reducer,"TOGGLE_WEBVIEW");

        store.subscribe(() =>{
            console.log(store.getState())
        })

        store.dispatch({type: "ATTACk", payload:"IRON MAn"})

        return (
            <View>
                <Text>
                    {store.getState()}
                </Text>
            </View>
        )
    }
}

export default ReduxDemo