
import { loadProductDetails } from "./loaderFunctions"

function addToBag(id, size, quantity) {

    // searches for the item with the passed ID and adds to the bag
    let product = loadProductDetails(id)

    // adding the size of the product to the object
    product = {...product, size: size, quantity: quantity}

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

// function to update the products quantity in the bag 
function updateBagQuantity(id, size, quantity) {

    // if user is not logged in, update localStorage
    const bagItems = JSON.parse(localStorage.getItem('bagItems'))
    const result = []

    bagItems.forEach(product => {
        // found product -> update the quantity & push to the array
        if((product.id === id) && (product.size === size)){
            result.push({...product, quantity: quantity})
        }else {
            result.push(product)
        }
    })

    // updating localStorage
    localStorage.setItem('bagItems', JSON.stringify(result))
}

export {addToBag, updateBagQuantity}