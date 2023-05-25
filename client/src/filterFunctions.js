
// sorting price from low to high
function sortAscending(list) {

    const result = list.sort((a, b) => a.price - b.price)
    return result
}

// sorting price from high to low
function sortDescending(list) {
    
    const result = list.sort((a,b) => b.price - a.price)
    return result
}

// filtering passed list by category
function filterCategory(list, collection) {

    // select makes no changes
    if(collection === 'select'){
        return list
    }else{
        const result = list.filter(product => (product.category.includes(collection)))
        return result
    }

}


export {sortAscending, sortDescending, filterCategory}