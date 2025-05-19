import React, { useContext, useEffect, useState } from 'react';
import { useParams ,useNavigate} from 'react-router-dom';
import './FoodPage.css';
import { StoreContext } from '../../Context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';
import SellerProfileCard from '../SellerCard/SellerCard';
import axios from 'axios';
import Btn from '../CustomBtn/CustomBtn'; 

const ProductDetails = () => {
  const { id } = useParams();
 const navigate = useNavigate();
  const { url, addToCart } = useContext(StoreContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [similarItems, setSimilarItems] = useState([]);
  const [seller, setSeller] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${url}/api/food/${id}`);
        if (response.data.success) {
          setProduct(response.data.data);
          const similarResponse = await axios.get(`${url}/api/food/similar/${id}`);
          if (similarResponse.data.success) {
            setSimilarItems(similarResponse.data.data);
          }
          const sellerResponse = await axios.get(`${url}/api/user/seller/${response.data.data.seller}`);
          if (sellerResponse.data.success) {
            setSeller(sellerResponse.data.data);
          }
        } else {
          setError("Product not found");
        }
      } catch (err) {
        setError("An error occurred while fetching the product details");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, url]);
  
  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(id);
  };
  const handleBuyNow = (e) => {
    e.stopPropagation();
    addToCart(id);
    navigate('/cart');
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const images = product.images.map(image => `${url}/${image}`);

  return (
    <div className="product-details">
      <div className="product-container">
        <div className="image-carousel">
          <div className="main-image">
            <img src={images[mainImageIndex]} alt={product.name} />
          </div>
          <div className="thumbnails">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className={index === mainImageIndex ? 'active' : ''}
                onClick={() => setMainImageIndex(index)}
              />
            ))}
          </div>
        </div>

        <div className="product-info">
          <h1>{product.name}</h1>
          <div className="brutalist-container">
            <h1 className="brutalist-input smooth-type">₹{product.price}</h1>
            <label className="brutalist-label">Offer!</label>
          </div>
          <div className="btn-container">
            <div onClick={handleBuyNow}>
             <Btn text="Buy Now"  />
            </div>
          
            <div onClick={handleAddToCart}>
              <Btn text="Add to Cart" />
            </div>
          </div>
        </div>
      </div>
      <div className="product-info-des">
        <div className="card">
          <p className="card-title">Description</p>
          <p className="small-desc">{product.description}</p>
          <div className="go-corner">
            <div className="go-arrow">→</div>
          </div>
        </div>
        <div>
          {seller && <SellerProfileCard seller={seller} />}
        </div>
      </div>
      <div className="similar-items">
        <h2>Similar Products</h2>
        <div className="similar-items-list">
          {similarItems.map(item => (
            <FoodItem
              key={item._id}
              id={item._id}
              image={item.images[0]} 
              name={item.name}
              desc={item.description}
              price={item.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;