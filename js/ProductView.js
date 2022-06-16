import React, { Component } from 'react';
import ProductItem from "./ProductItem";

import {
    WebView,
    StyleSheet,
    View,
    Text,
    Button,
    FlatList,
    ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux'
import { getProducts } from './API/djknapi';
import { withNavigationFocus } from 'react-navigation';

class ProductView extends React.Component {
    constructor(props){
        super(props)
        this.state = { 
            products:[],
            isLoading: false,
            test: 'nop'
         }
        this._loadProducts = this._loadProducts.bind(this);
        this._displayLoading = this._displayLoading.bind(this);

    }

    componentDidMount(){
        this._loadProducts()
        this.props.navigation.addListener('willFocus', this._onFocus);
        this.props.navigation.addListener('willBlur', this._onBlur);  
    }

    componentWillUnmount() {
        this.props.navigation.removeListener('willBlur', this._onBlur);
        this.props.navigation.removeListener('willFocus', this._onFocus);
    }

    _onFocus = () => {
        const action = { type: "TOGGLE_AR_TAB", value: 'false' }
        this.props.dispatch(action)
    };
    
    _onBlur = () => {
        
    };

    _loadProducts(){
        this.setState({ isLoading: true })
        getProducts().then(data => {
            this.setState({
                products : data,
                isLoading: false
            })
        })
    }

    _displayLoading() {
        if (this.state.isLoading) {
          return (
            <View style={localStyles.loading_container}>
              <ActivityIndicator size='large' color="#00ff00"/>
              {/* Le component ActivityIndicator possède une propriété size pour définir la taille du visuel de chargement : small ou large. Par défaut size vaut small, on met donc large pour que le chargement soit bien visible */}
            </View>
          )
        }
    }

    render(){
        return(
            <View>
                <FlatList
                    data={this.state.products}
                    keyExtractor={(item) => item.name.toString()}
                    renderItem={({item}) => <ProductItem product = {item} navigation={this.props.navigation}/>}
                    onEndReachedThreshold={0.5}
                />
                {this._displayLoading()}
            </View>
        )
    }
}

var localStyles = StyleSheet.create({
    ViewContainer :{
        flex : 1,
        flexDirection: 'column',
        backgroundColor: '#FDFDFD',
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 300,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
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

export default connect(mapStateToProps)(ProductView)
