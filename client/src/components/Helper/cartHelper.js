export const cartCount = () => {
    let cart = JSON.parse( window.localStorage.getItem('cart') );
    return cart ? cart.totalItems: 0;
}