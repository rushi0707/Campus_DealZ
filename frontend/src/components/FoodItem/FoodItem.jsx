import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './FoodItem.css';
import { StoreContext } from '../../Context/StoreContext';

const FoodItem = ({ image, name, price, desc, id }) => {
    const { cartItems, addToCart, removeFromCart, url, currency } = useContext(StoreContext);
    const navigate = useNavigate();

    const handleItemClick = () => {
        navigate(`/product/${id}`);
    };

    const handleAddToCart = (e) => {
        e.stopPropagation(); // Prevent the card click event
        addToCart(id);
    };

    return (
        <div className="product-card" onClick={handleItemClick}>
            <div className="product-card-header">
                {name}
            </div>
            <div className="product-card-body">
                <img src={`${url}/${image}`} alt={name} className="product-card-image" />

            </div>
            <div className="product-card-footer">
                <span>{currency}{price}</span>
                <button className="add-to-cart-button" onClick={handleAddToCart}>Add to Cart</button>
            </div>
        </div>
    );
};

export default FoodItem;