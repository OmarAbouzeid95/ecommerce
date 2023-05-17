import { loadProductDetails } from "./loaderFunctions"


function addToBag(id, size, quantity) {

    let existing = false
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
        // check if product and size already exists in the localStorage
        bagItems.forEach(product => {
            if((product.id === id) && (product.size === size)){
                existing = true
                product.quantity += quantity
            }
        })

        if(!existing)
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

// function to remove an item from the bag
function removeFromBag(id, size) {

    // if no user is logged in update the local Storage
    const bagItems = JSON.parse(localStorage.getItem('bagItems'))
    const result = []

    bagItems.forEach(product => {
        if(!((product.id === id) && (product.size === size))){
            result.push(product)
        }
    })

    // updating the localStorage
    localStorage.setItem('bagItems', JSON.stringify(result))
}

// function that returns the number of items in the bag
function bagCount() {
    
    // if user is not signed in check localStorage
    const bagItems = JSON.parse(localStorage.getItem('bagItems'))
    let count = 0

    if(bagItems){
        bagItems.forEach(product => {
            count += product.quantity
        })
    }

    return count
}

export {addToBag, updateBagQuantity, removeFromBag, bagCount}