
// signing in/up function
async function userSignOperation(url, user) {
    // get request using the email and password
    const res = await fetch(url, {
        method: 'POST',
        headers: {"Content-type": 'application/json'},
        body: JSON.stringify(user)
    })
    const data = await res.json()
    return data
}

// find user function
async function findUser(url) {
    const res = await fetch(url)
    const data = await res.json()
    return data
}

// updating bagItems
async function updateBagItems(url, user) {
    const res = await fetch(url, {
        method: 'PATCH',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(user)
    })
    const data = await res.json()
    return data
}

// updating user information
async function updateUserData(url, user){
    const res = await fetch(url, {
        method: 'PATCH',
        headers: {'Content-type' : 'application/json'},
        body: JSON.stringify(user)
    })

    const data = await res.json()
    return data
}

// find product function
async function findProduct(url) {
    const res = await fetch(url)
    const data = await res.json()
    return data
}

// updating product information
async function updateProduct(url, info, id){
    const sentData = {
        info: info,
        id: id
    }
    const res = await fetch(url, {
        method: 'PATCH',
        headers: {'Content-type' : 'application/json'},
        body: JSON.stringify(sentData)
    })

    const data = await res.json()
    return data
}



export {userSignOperation, findUser, updateBagItems, updateUserData, findProduct, updateProduct}