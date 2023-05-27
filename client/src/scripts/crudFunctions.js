
// signing in validation
async function validateSignIn(url, user) {
    // get request using the email and password
    const res = await fetch(url, {
        method: 'POST',
        headers: {"Content-type": 'application/json'},
        body: JSON.stringify(user)
    })
    const data = await res.json()
    return data
}



export {validateSignIn}