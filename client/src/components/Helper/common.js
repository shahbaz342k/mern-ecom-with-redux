export const firstLetterUpperCase = (string) => {
    return string.charAt(0).toLocaleUpperCase() + string.slice(1)
} 

export const convertCartProductsToArrOfObjects = (cartItems) => {

    let productids= Object.keys(cartItems.items);
    let productQty= Object.values(cartItems.items);

    var result1 = {};
    productids.forEach((key, i) => result1[key] = productQty[i]);
    // console.log(result1);

    var values = Object.values(result1);
    var final = [];
    var counter = 0;
    var portion = {};

    for (var key in result1) {
        if (counter !== 0 && counter % 1 === 0) {
            final.push(portion);
            portion = {};
        }
        portion['productId'] = key;
        portion['productQty'] = values[counter];
        counter++
    }
    final.push(portion);

    console.log(final)
    return final;
}