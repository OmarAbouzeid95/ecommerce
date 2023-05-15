import db from './db'


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

function getWinterJackets(category) {

    const winterJackets = db.winterJakcets
    const result = winterJackets.filter(jacket => (jacket.gender === category))
    return result
}

// fetching required data for the corresponding Shop Category (Men/ Women/ Kids)
function loadShopCategory(category) {

    // making sure category is in lowercase
    category = category.toLowerCase()
    switch(category) {
        case('men'):
            const winterJackets =  getWinterJackets('men')
            return {
                winterJackets: winterJackets
            }
        case('women'):
            return 'women'
        case('kids'):
            return 'kids'
        default:
            break
    }
}

export {loadProductDetails, loadShopCategory}