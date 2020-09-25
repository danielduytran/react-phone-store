import React, { Component } from 'react';
import { storeProducts, detailProduct } from './data';

const ProductContext = React.createContext();

class ProductProvider extends Component {
    state = {
        products: [],
        detailProduct: detailProduct,
        cart: [],
        modalOpen: false,
        modalProduct: detailProduct,
        cartSubTotal: 0,
        cartTax: 0,
        cartTotal: 0
    }

    componentDidMount() {
        this.setProducts();
    }

    setProducts = () => {
        let products = [];
        for (const product of storeProducts) {
            products = [...products, { ...product }];
        }
        this.setState({ products: products });
    }

    detailHandler = (id) => {
        const product = this.state.products.find(prod => prod.id === id);
        this.setState({ detailProduct: product });
    }

    addToCartHandler = (id) => {
        const tempProducts = [...this.state.products];
        const product = tempProducts.find(prod => prod.id === id);
        product.inCart = true;
        product.count = 1;
        product.total = product.price;
        this.setState({ products: tempProducts, cart: [...this.state.cart, product] }, () => this.calculateTotals());
    }

    modalOpenHandler = id => {
        const product = this.state.products.find(prod => prod.id === id);
        this.setState({ modalOpen: true, modalProduct: product });
    }

    modalCloseHandler = () => {
        this.setState({ modalOpen: false });
    }

    incrementHandler = (id) => {
        const tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(prod => prod.id === id);
        selectedProduct.count++;
        selectedProduct.total = selectedProduct.count * selectedProduct.price;
        this.setState({ cart: tempCart }, () => this.calculateTotals());
    }

    decrementHandler = (id) => {
        const tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(prod => prod.id === id);
        selectedProduct.count--;
        if (selectedProduct.count === 0) {
            this.removeHandler(id);
        } else {
            selectedProduct.total = selectedProduct.count * selectedProduct.price;
            this.setState({ cart: tempCart }, () => this.calculateTotals());
        }
    }

    removeHandler = (id) => {
        const tempCart = [...this.state.cart].filter(prod => prod.id !== id);
        const tempProducts = [...this.state.products];
        const removedProduct = tempProducts.find(prod => prod.id === id);
        removedProduct.inCart = false;
        removedProduct.count = 0;
        removedProduct.total = 0;
        this.setState({ products: tempProducts, cart: tempCart }, () => this.calculateTotals());
    }

    clearCartHandler = () => {
        this.setState({ cart: [] }, () => {
            this.setProducts();
            this.calculateTotals();
        })
    }

    calculateTotals = () => {
        let subTotal = 0;
        this.state.cart.map(prod => (subTotal += prod.total));
        const tax = parseFloat((subTotal * 0.1).toFixed(2));
        const total = subTotal + tax;
        this.setState({ cartSubTotal: subTotal, cartTax: tax, cartTotal: total });
    }

    render() {
        return (
            <ProductContext.Provider value={{
                ...this.state,
                detailHandler: this.detailHandler,
                addToCartHandler: this.addToCartHandler,
                modalOpenHandler: this.modalOpenHandler,
                modalCloseHandler: this.modalCloseHandler,
                incrementHandler: this.incrementHandler,
                decrementHandler: this.decrementHandler,
                removeHandler: this.removeHandler,
                clearCartHandler: this.clearCartHandler
            }}>
                {this.props.children}
            </ProductContext.Provider>
        )
    }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };