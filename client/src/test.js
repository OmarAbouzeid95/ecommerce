
const db = {
    a: [1,2,3],
    b: [5,6,7]
}

const keys = Object.keys(db)
console.log(keys)

for(let i = 0; i < keys.length; i++){
    const currentKey = db[keys[i]]
    for(let j = 0; j < currentKey.length; j++){
        console.log(currentKey[j])
    }
}