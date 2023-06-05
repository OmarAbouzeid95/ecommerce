import db from '../db'


// traversing over the DB looking for the corresponding ID
function loadProductDetails(id) {
    
    const parsedId = parseInt(id)
    // getting db Keys to traverse
    const keys = Object.keys(db)

    // traversing till found
    for(let i = 0; i < keys.length; i++){
        const currentKey = db[keys[i]]
        for(let j = 0; j < currentKey.length; j++){
            if(currentKey[j].id === parsedId)
                return currentKey[j]
        }
    }
}

function getCategory(collection, gender) {

    const cat = db[collection]
    // if a gender is passed filter by gender, else return all category
    const result = gender ? cat.filter(jacket => (jacket.gender === gender)) : cat

    const category = (collection === 'summerWear') ? 'Summer Collection' : collection

    return {result, category}
}

// fetching required data for the corresponding Shop Category (Men/ Women/ Kids)
function loadShopCategory(category) {

    // making sure category is in lowercase
    category = category.toLowerCase()

    switch(category) {
        case('men'): 
            return {
                winterJackets: getCategory('winterJackets', 'men').result,
                summerWear: getCategory('summerWear', 'men').result,
                trending: getCategory('trending', 'men').result,
                category: "Men's"
            }
        case('women'):

            return {
                winterJackets:  getCategory('winterJackets', 'women').result,
                summerWear: getCategory('summerWear', 'women').result,
                trending: getCategory('trending', 'women').result,
                category: "Women's"
            }
        case('kids'):
            return {
                kids: db.kids,
                category: "Kids"
            }
        default:
            break
    }
}

// loading searched items
function loadSearchedKey(keyword){

    //transform keyword to lowercase
    keyword = (keyword !== 'all-products') ? keyword.toLowerCase() : ''
    // traverse the whole db and checking if key is matching the keyword
    let result = []
    for (const category in db) {
        // filtering the category array if product name contains the keyword and concatinating to the result array
        const filtered = db[category].filter(product => (product.name.toLowerCase().includes(keyword)))
        result = result.concat(filtered)
    }


    return {result, keyword}
}

// function to redirect the user
function redirect(loc) {

    window.location.href = loc
}


export {loadProductDetails, loadShopCategory, loadSearchedKey, redirect, getCategory}