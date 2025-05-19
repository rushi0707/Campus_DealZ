import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import ItemDisplay from '../../components/ItemDisplay/ItemDisplay';

const Home = () => {
  const [college, setCollege] = useState('NIT Warangal');
  const [category, setCategory] = useState('All');

  return (
    <>
      <Header />
      <ExploreMenu  college={college} setCollege={setCollege}/>
      <ItemDisplay setCollege={setCollege} setCategory={setCategory} category={category} college={college} />
    </>
  );
};

export default Home;
