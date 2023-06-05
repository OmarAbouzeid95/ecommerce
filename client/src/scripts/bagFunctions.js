import { loadProductDetails } from "./loaderFunctions"
import { updateBagItems } from "./crudFunctions"


function addToBag(id, size, quantity, user, url) {

    let existing = false
    // searches for the item with the passed ID and adds to the bag
    let product = loadProductDetails(id)

    // adding the size of the product to the object
    product = {...product, size: size, quantity: quantity}

    // if no user is logged in fetch from local storage
    let bagItems = user ? user.bagItems : JSON.parse(localStorage.getItem('bagItems'))

    // no data is present in the localStorage
    if(!bagItems || bagItems.length === 0){
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

    if(!user){
        // setting the localStorage attribute to the array
        localStorage.setItem('bagItems', JSON.stringify(bagItems))
        return null
    }else{
        user = {...user, bagItems: bagItems}
        updateBagItems(url, user).then(() => user)
    }

    
}

// function to update the products quantity in the bag 
async function updateBagQuantity(id, size, quantity, user, url) {

    // if no user is logged in fetch from local storage
    const bagItems = user ? user.bagItems : JSON.parse(localStorage.getItem('bagItems'))
    const result = []

    bagItems.forEach(product => {
        // found product -> update the quantity & push to the array
        if((product.id === id) && (product.size === size)){
            result.push({...product, quantity: quantity})
        }else {
            result.push(product)
        }
    })

    if(!user){
        // updating localStorage
        localStorage.setItem('bagItems', JSON.stringify(result))
        return null
    }else{
        user = {...user, bagItems: bagItems}
        const updatedUser = await updateBagItems(url, user)
        return updatedUser
    }
}

// function to remove an item from the bag
function removeFromBag(id, size, user, url) {

    // if no user is logged in fetch from local storage
    const bagItems = user ? user.bagItems : JSON.parse(localStorage.getItem('bagItems'))
    const result = []

    bagItems.forEach(product => {
        if(!((product.id === id) && (product.size === size))){
            result.push(product)
        }
    })

    if(!user){
        // setting the localStorage attribute to the array
        localStorage.setItem('bagItems', JSON.stringify(bagItems))
        return null
    }else{
        user = {...user, bagItems: bagItems}
        updateBagItems(url, user).then(() => user)
    }
}

// function that returns the number of items in the bag
function bagCount(user) {
    
    // if user is not signed in check localStorage
    const bagItems = user ? user.bagItems : JSON.parse(localStorage.getItem('bagItems'))
    let count = 0

    if(bagItems){
        bagItems.forEach(product => {
            count += product.quantity
        })
    }

    return count
}

export {addToBag, updateBagQuantity, removeFromBag, bagCount}