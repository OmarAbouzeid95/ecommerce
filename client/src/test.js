

const obj = {'1': 2, '2': 3}

for (let value of Object.values(obj)) {
    value += 5
}

console.log(obj)