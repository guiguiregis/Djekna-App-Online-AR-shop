import React, { Component } from 'react';
import { getImageProduct } from './API/djknapi';
import {
    WebView,
    StyleSheet,
    View,
    Text,
    Button,
    FlatList,
    ActivityIndicator,
    TouchableOpacity,
    ScrollView,
    Image
} from 'react-native';

class ProductDetailView extends React.Component {
    constructor(props){
        super(props)
        this.state = { 
            mainImage:this.props.navigation.state.params.product['images'][0],
            mainImageSelected:false
        }
        this.productContent = this.productContent.bind(this)
    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerRight: (
                <TouchableOpacity style={styles.headercategory}  onPress={() => navigation.navigate('Produits')}>
                    <Text style ={styles.headerText} >
                        {navigation.state.params.product['categories'][0].name}
                    </Text>
                </TouchableOpacity> 
            ),
            headerTitle: navigation.state.params.product.name,
        };
    };

    productContent(){
        const product = this.props.navigation.state.params.product 
        const productImages = product['images'].map((image) =>
            <TouchableOpacity onPress={() => this.setState({mainImage:image})}>
                <Image
                    style={styles.small_image}
                    source={{uri: getImageProduct(image.src)}}
                />
            </TouchableOpacity>
        )
        if(this.state.mainImageSelected == true){
            return(
                <View style = {styles.detail_Image_view}>
                    <View>
                        <Image
                            style={styles.inner_detail_image}
                            source={{uri: getImageProduct(this.state.mainImage.src)}}
                        />
                    </View>
                </View>
            )
        }else{
            return(
                <ScrollView style = {styles.view_container}>
                    <View style = {styles.image_container}>
                        <View style = {styles.main_image_viewer} scrollEnabled={true} horizontal={true} vertical = {true}>
                            <Image
                                style={styles.main_image}
                                source={{uri: getImageProduct(this.state.mainImage.src)}}
                            />
                        </View>
                        <ScrollView horizontal={true}>
                            {productImages}
                        </ScrollView>
                    </View>
                    <View style={styles.sub_info}>
                        <Text style={{marginTop:5,marginBottom:5}}>
                            Sold by: DJEKNA
                        </Text>
                        <Text style={{marginTop:5,marginBottom:10}}>
                            Availability: {product.stock_quantity}
                        </Text>
                    </View>
                    <View style = {styles.webview_container}>
                        <WebView
                            scrollEnabled = {false}
                            originWhitelist={['*']}
                            source={{ html: product.short_description }}
                            style={{
                                marginLeft: '-55%',
                                marginRight: '-55%',
                                height:'60%',
                                justifyContent: "center",
                            }}
                        />
                    </View>
                    <View>

                    </View>
                </ScrollView>
            )
        }
    }

    render(){
        return(
            <View>
                {this.productContent()}
            </View>
        )
    }
}


const styles = StyleSheet.create({
    image_container:{
        backgroundColor:'white',
        height:600,
        marginTop: 5,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 5,
        //borderBottomLeftRadius: 10
        borderRadius: 5
    },
    main_image:{
        flex: 1,
        height: '100%',
        width: '100%',
    },
    small_image:{
        height: 120,
        width: 120,
        marginEnd:50,
        marginStart:50,
        marginTop: 10,
        marginBottom:10
    },
    main_image_viewer:{
        backgroundColor:'gray',
        height:420,
        margin: 15
    },
    detail_Image_view:{
        backgroundColor:'black',
        height:'100%'
    },
    inner_detail_image:{
        flex:1,
        height:500,
        marginTop: 100,
        marginBottom: 100,
    },
    sub_info:{
        flex:1,
        flexDirection:"column",
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 30,
        marginBottom:30
    },
    view_container:{
        
    },
    webview_container:{
        flex:1,
        height:500,
        borderRadius: 5,
        marginTop: 5,
        paddingLeft: 30,
        paddingRight: 30,
        marginBottom: 5,
        backgroundColor: 'transparent'
    },
    headercategory:{
        marginStart: 20,
        marginEnd: 20,
    },
    headerText:{
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    },
    buttons : {
        height: 80,
        width: 80,
        margin: 20,
        top: '50%',
        backgroundColor:'#e74c3c',
        borderRadius: 50,
        flex:1,
        flexDirection:"row",
        opacity: .5,
        justifyContent:"center",
        alignItems: "center"
      },
    floatingView: {
        flex : 1,
        position: "absolute",
        zIndex: 5,
        backgroundColor: 'transparent',
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
  
    }
})

export default ProductDetailView