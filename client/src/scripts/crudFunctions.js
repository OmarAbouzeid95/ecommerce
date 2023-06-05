
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


export {userSignOperation, findUser, updateBagItems}