
const spec = "1693"
const spec1 = "1692"
const spec2 = "1629"

export function getProductfromText (text) {
    const url = 'http://djekna.com/wp-json/wc/v3/products/'+ text
    return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
    
}
fetch('http://djekna.com/wp-json/wc/v3/products')
        .then(results => {
            return results.json()
        })
export function getProducts () {
    const url = 'http://djekna.com/wp-json/wc/v3/products'
    return fetch('http://djekna.com/wp-json/wc/v3/products')
    .then(results => {
        return results.json()
    }) 
}

export function getImageProduct (url) {
    return url 
}

export function getData(){
    const url = 'http://djekna.com/wp-json/wc/v3/data/'
    return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

export function getSpecificData(text){
    const url = 'http://djekna.com/wp-json/wc/v3/data/'+text
    return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}