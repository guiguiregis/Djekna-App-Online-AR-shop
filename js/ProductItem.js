import React from 'react'
import { StyleSheet, View, Text,Image,TouchableOpacity } from 'react-native'
import { getImageProduct } from './API/djknapi';

class ProductItem extends React.Component {

  constructor(props){
    super(props)
    this.productDetail = this.productDetail.bind(this)
  }

  render() {
    const product = this.props.product
    const name = this.props.product.name
    const images = this.props.product['images']
    const ratingCount = [1,2,3,4,5]
    const ratings = ratingCount.map((replaceByProductRatingData) =>
      <Image
            style={styles.ratingStyle}
            source={require('./res/star-off.png')}
      />
    )
  
    return (
      <View style={styles.main_container}>
        <Image
          style={styles.image}
          source={{uri: getImageProduct(images[0].src)}}
        />
        <Text style={styles.title_text}>{name}</Text>
        <View style={styles.rating_container}>{ratings}</View>
        <TouchableOpacity onPress={() => this.props.navigation.navigate("ProductDetailView",{product:product})} style = {styles.button}>
              <Text style = {styles.buttonText}>
                Lire la suite
              </Text>
        </TouchableOpacity>
        <Text style={styles.sold_by_text}>Sold by:DJEKNA</Text>
        <Text style={styles.description_text}>Test</Text>
      </View>
    )
  }

  productDetail(props){
    const productn = props.product.name
    this.props.navigation.navigate("ProductDetailView",{productn:productn})
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex:1,
    flexDirection: 'column',
    alignItems: 'center',
    height: 600,
    //width: '50%',
    backgroundColor: '#fff',
    marginTop: 20,
    marginRight: 9,
    marginLeft: 9,
    marginBottom: 20,
    borderRadius: 3,
    shadowOffset:{  width: 6,  height: 5,  },
    shadowColor: 'black',
    shadowOpacity: .6,
  },
  title_text: {
    fontSize: 20,
  },
  sold_by_text:{
    fontSize: 10,
    marginBottom: 2,
    marginTop: 2,
  },
  description_text:{
    fontSize: 18,
    marginBottom: 10,
    marginTop: 10,
  },
  image:{
    width: '60%',
    height: '65%',
    margin: 10,
    backgroundColor: 'gray'
  },
  button:{
    width: '40%',
    height: '10%',
    marginBottom: 5,
    marginTop: 5,
    backgroundColor:'#e74c3c',
    borderRadius: 5,
    borderBottomColor: '#bf2718',
    borderBottomWidth: 5,
    flex:1,
    flexDirection: "row",
    alignItems: "center"
  },
  buttonText:{
    color:'white',
    textAlign:'center',
    fontSize: 20,
    flex:1,
    flexDirection: "row",
  },
  rating_container:{
    flex:1,
    flexDirection: "row",
    alignItems: "center",
  },
  ratingStyle:{

  }

})

export default ProductItem