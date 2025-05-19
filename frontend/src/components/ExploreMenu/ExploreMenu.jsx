import React, { useContext } from 'react';
import './ExploreMenu.css';
import { StoreContext } from '../../Context/StoreContext';

const ExploreMenu = ({ college, setCollege }) => {
  const { menu_list } = useContext(StoreContext);

  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Explore our menu</h1>
      <p className='explore-menu-text'>Explore a diverse selection of pre-loved items from your university community. Our mission is to help you find what you need, from textbooks to tech gadgets, while giving new life to gently used treasures. Elevate your campus experience by making sustainable choices, one great deal at a time.</p>
      <div className="explore-menu-list">
        {menu_list.map((item, index) => (
          <div 
            key={index} 
            className='explore-menu-list-item' 
            onClick={() => setCollege(prev => prev === item.menu_name ? "All" : item.menu_name)}
          >
            <img 
              src={item.menu_image} 
              className={college === item.menu_name ? "active" : ""} 
              alt={item.menu_name} 
            />
            <p>{item.menu_name}</p>
          </div>
        ))}
      </div>
      <hr />
    </div>
  );
}

export default ExploreMenu;
