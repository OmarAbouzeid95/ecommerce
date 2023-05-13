import db from './db'


function loadProductDetails(id) {

    const parsedId = parseInt(id)
    // traversing over the DB looking for the corresponding ID
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

export default loadProductDetails