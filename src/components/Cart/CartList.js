import React from 'react';

import CartItem from './CartItem';

export default function CartList({ value }) {
    const { cart } = value;
    return (
        <div>
            {cart.map(prod => <CartItem key={prod.id} product={prod} value={value} />)}
        </div>
    )
}
