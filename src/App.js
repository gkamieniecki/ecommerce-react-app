import './App.css';
import React, { useState, useEffect } from 'react';
import SearchBox from './components/SearchBox.js';
import Card from './components/Card.js'
import Log from './components/Products.js'

const API_KEY = process.env.REACT_APP_API_KEY;

// `https://api.thecatapi.com/v1/images/search?api_key=${API_KEY}`

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([
    {
      kitty: "",
      price: "",
    }
  ])


  // const [products] = useState([
  //   {
  //     name: kitty 1,
  //     price: £50.00,
      
  //   },
  // {
    //     name: kitty 2,
    //     price: £0.00,
        
    //   }
      
  // ])

  useEffect(() => {
    handleFetch();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  })

  const handleFetch = async () => {
    const response = await fetch(`https://api.thecatapi.com/v1/images/search?order=desc&limit=10&mime_types=static&size=med&api_key=${API_KEY}`)

    const data = await response.json();
    setData(data);
  }
  
  if (loading) return <h1>Loading...</h1>;
  return (
    <div className="container">
      <div className="header">
        <h1>Cats4Lyf</h1>
        <SearchBox />
      </div>
      <div className="content">
        {/* <CardList /> */}
        <Card imgSrc={`${data[0].url}`} name="Kitty 1" price="£20"/>
        <Card imgSrc={`${data[1].url}`} name="Kitty 2" price="£30"/>
        <Card imgSrc={`${data[2].url}`} name="Kitty 3" price="£40"/>
        <Card imgSrc={`${data[3].url}`} name="Kitty 4" price="£50"/>
        <Card imgSrc={`${data[4].url}`} name="Kitty 5" price="£50"/>
        <Card imgSrc={`${data[5].url}`} name="Kitty 6" price="£50"/>
        <Card imgSrc={`${data[6].url}`} name="Kitty 7" price="£50"/>
        <Card imgSrc={`${data[7].url}`} name="Kitty 8" price="£50"/>
        <Card imgSrc={`${data[8].url}`} name="Kitty 9" price="£50"/>
        <Card imgSrc={`${data[9].url}`} name="Kitty 10" price="£50"/>
      </div>
    </div>
  )
}

export default App;