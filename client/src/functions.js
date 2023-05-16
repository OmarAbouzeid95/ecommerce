
import { loadProductDetails } from "./loaderFunctions"

function addToBag(id, size) {

    // searches for the item with the passed ID and adds to the bag
    let product = loadProductDetails(id)

    // adding the size of the product to the object
    product = {...product, size: size}

    // if user is not logged in save to local storage
    let bagItems = JSON.parse(localStorage.getItem('bagItems'))

    // no data is present in the localStorage
    if(!bagItems){
        bagItems = [product]
    }else{
        bagItems.push(product)
    }

    // setting the localStorage attribute to the array
    localStorage.setItem('bagItems', JSON.stringify(bagItems))

    
}

export {addToBag}