import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ProductConsumer } from '../context';
import { ButtonContainer } from './Button';

export default class Details extends Component {
    render() {
        return (
            <ProductConsumer>
                {value => {
                    const { id, title, img, price, company, info, inCart } = value.detailProduct;
                    return (
                        <div className="container">
                            {/* Title */}
                            <div className="row">
                                <div className="col-10 mx-auto text-center text-slanted text-blue my-5">
                                    <h1>{title}</h1>
                                </div>
                            </div>
                            {/* Product Details */}
                            <div className="row">
                                <div className="col-10 mx-auto col-md-6 my-3">
                                    <img src={img} alt="product" className="img-fluid" />
                                </div>
                                <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                                    <h2>Model: {title}</h2>
                                    <h4 className="text-title text-uppercase text-muted mt-3 mb-2">Made by: <span className="text-uppercase">{company}</span></h4>
                                    <h4 className="text-blue"><strong>Price: <span>$</span>{price}</strong></h4>
                                    <p className="text-capitalize font-weight-bold mt-3 mb-0">Some info about product: </p><p className="text-muted lead">{info}</p>
                                    {/* Buttons */}
                                    <div>
                                        <Link to="/">
                                            <ButtonContainer>Back to product</ButtonContainer>
                                        </Link>
                                        <ButtonContainer cart
                                            disable={inCart}
                                            onClick={() => {
                                                value.addToCartHandler(id);
                                                value.modalOpenHandler(id);
                                            }}>
                                            {inCart ? "In Cart" : "Add to Cart"}
                                        </ButtonContainer>
                                    </div>
                                </div>

                            </div>
                        </div>
                    );
                }}
            </ProductConsumer>
        )
    }
}
