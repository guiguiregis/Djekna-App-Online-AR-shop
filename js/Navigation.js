// js/Navigation.js

import { createStackNavigator, createBottomTabNavigator, NavigationActions, withNavigation} from 'react-navigation'
import DjeknaNav from "./DjeknaView";
import CrossScene from "./crossScene";
import WebViewer from "./WebViewer";
import BoutiqueView from "./BoutiquesView"
import ProductView from "./ProductView"
import ProductDetailView from "./ProductDetailView"
import { Button,Image } from 'react-native';
import React from 'react'

const DjeknaStackNavigator = createStackNavigator({

  CrossScene: { // Ici j'ai appelé la vue "Search" mais on peut mettre ce que l'on veut. C'est le nom qu'on utilisera pour appeler cette vue
  screen: CrossScene,
  navigationOptions: {
    title: 'AR',
    headerStyle:{
      backgroundColor: 'transparent',
    },
    headerBackTitle: 'AR Mode',
    headerTransparent:true,
    headerTitleStyle:{
      fontWeight: '900',
      color:'#fff',
      justifyContent: 'space-between',
      textAlign: 'center',
      textShadowColor: 'rgba(0, 0, 0, 0.75)',
      textShadowOffset: {width: 1, height: 1},
      textShadowRadius: 2
    }
    //header:null,
  }
},
    DjeknaView: { // Ici j'ai appelé la vue "Search" mais on peut mettre ce que l'on veut. C'est le nom qu'on utilisera pour appeler cette vue
    screen: DjeknaNav,
    navigationOptions: {
      title: 'Repere ton model favori',
      headerStyle:{
        backgroundColor: 'transparent',
      },
      headerBackTitle: 'AR Mode',
      headerTransparent:true,
      headerTitleStyle:{
        fontWeight: '900',
        color:'#fff',
        justifyContent: 'space-between',
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 2
      }
      //header:null,
    }
  },
  /*WebViewer: { // Ici j'ai appelé la vue "Search" mais on peut mettre ce que l'on veut. C'est le nom qu'on utilisera pour appeler cette vue
    screen: WebViewer,
    navigationOptions: {
      title: 'model name'
    }
  }*/
})

const ProductStackNavigator = createStackNavigator({
  ProductView:{
    screen: ProductView,
    navigationOptions: {
      title: 'Nos Produits',
      headerStyle:{
        backgroundColor: '#e74c3c',
      },
      headerBackTitle: 'Produits',
      //headerTransparent:true,
      headerTitleStyle:{
        fontWeight: '900',
        color:'#fff',
        justifyContent: 'space-between',
        textAlign: 'center',
        //textShadowColor: 'rgba(0, 0, 0, 0.75)',
        //textShadowOffset: {width: 1, height: 1},
        //textShadowRadius: 2
      },
    }

  },
  ProductDetailView:{
    screen: ProductDetailView,
    navigationOptions: {
      headerStyle:{
        backgroundColor: '#e74c3c',
      },
      headerBackTitle: 'Nos Produit',
      //headerTransparent:true,
      headerTitleStyle:{
        fontWeight: '900',
        color:'#fff',
        justifyContent: 'space-between',
        textAlign: 'center',
        //textShadowColor: 'rgba(0, 0, 0, 0.75)',
        //textShadowOffset: {width: 1, height: 1},
        //textShadowRadius: 2
      }
    }
  }
})

const BoutiquesStackNavigator = createStackNavigator({
  BoutiquesView:{
    screen: BoutiqueView,
    navigationOptions: {
      title: 'Nos Boutiques',
      headerStyle:{
        backgroundColor: '#e74c3c',
      },
      headerBackTitle: 'Boutiques',
      //headerTransparent:true,
      headerTitleStyle:{
        fontWeight: '900',
        color:'#fff',
        justifyContent: 'space-between',
        textAlign: 'center',
        //textShadowColor: 'rgba(0, 0, 0, 0.75)',
        //textShadowOffset: {width: 1, height: 1},
        //textShadowRadius: 2
      }
    }

  }
})

const DjeknaTabNavigator = createBottomTabNavigator({
  Produits : {
    screen: ProductStackNavigator,
    navigationOptions:{
      
    }
  },
  Photo: {
    screen: DjeknaStackNavigator,
    navigationOptions:{
      tabBarVisible: false,
    }
 },
  Boutiques: {
    screen: BoutiquesStackNavigator,
    navigationOptions:{
      
    }
  },
},
{
  swipeEnabled:true,
  tabBarOptions:{
    activeTintColor: '#34495e',
    inactiveTintColor: '#fff',
  labelStyle: {
    fontSize: 12,
  },
    style:{
      backgroundColor:'#e74c3c'
    }
  }
},
{
  backBehavior:{

  }
}
)

//export default ProductStackNavigator
export default DjeknaTabNavigator