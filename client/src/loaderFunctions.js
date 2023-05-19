import db from './db'

// const db = {
//     winterJackets: [
//         'WJ1', 'WJ2', 'WJ3'
//     ], 
//     summerWear: [
//         'SW1', 'SW2', 'SW3'
//     ],
//     kids: [
//         'KD1', 'KD2', 'KD3'
//     ]
// } 

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

function getCategory(category, gender) {

    const cat = db[category]
    const result = cat.filter(jacket => (jacket.gender === gender))
    console.log(result)
    return result
}

// fetching required data for the corresponding Shop Category (Men/ Women/ Kids)
function loadShopCategory(category) {

    // making sure category is in lowercase
    category = category.toLowerCase()

    switch(category) {
        case('men'): 
            return {
                winterJackets: getCategory('winterJackets', 'men'),
                summerWear: getCategory('summerWear', 'men')
            }
        case('women'):

            return {
                winterJackets:  getCategory('winterJackets', 'women'),
                summerWear: getCategory('summerWear', 'women')
            }
        case('kids'):
            return {
                kids: db.kids
            }
        default:
            break
    }
}

// loading bag items
function loadBagItems() {

    // if user is not logged in load from localStorage
    const result = JSON.parse(localStorage.getItem('bagItems'))

    return result
}


export {loadProductDetails, loadShopCategory, loadBagItems}