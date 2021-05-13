import './App.css';
import React, { useState, useEffect } from 'react';
import SearchBox from './components/SearchBox.js';
import Card from './components/Card.js';
import productsData from "./components/Products.json";
import Sidebar from "./components/Sidebar.js"

const API_KEY = process.env.REACT_APP_API_KEY;

// `https://api.thecatapi.com/v1/images/search?api_key=${API_KEY}`

// i have added a line to test pulling and stuff on github

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");
  const [input, setInput] = useState("");
  const [showCard, setShowCard] = useState(false);
  const [cardClicked, setCardClicked] = useState("");
  const [cartItems, setCartItems] = useState([]);

  const addToCart=(item)=>{
    console.log("added to cart")
    setCartItems([...cartItems, item]);  
  }

  const showCart=()=>{
    console.log(cartItems) 
  }

  /* when using useEffect it will cause an infinite loop if square brackets aren't there as a second argument 
  (https://stackoverflow.com/questions/53243203/react-hook-useeffect-runs-continuously-forever-infinite-loop) */

  useEffect(() => {
    handleFetch();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleFetch = async () => {
    try {
      const response = await fetch(`https://api.thecatapi.com/v1/images/search?limit=11&mime_types=static&order=desc&api_key=${API_KEY}`);
      if (response.status !== 200) {
        throw new Error ("Failed to fetch cat images");
      }
      const data = await response.json();
      // remove duplicate image
      await data.splice(2, 1)

      setData(data);
    } catch (Error) {
      setError(Error.message);
    }
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();
    setSearch(input);
    setInput("");
  }

  const toggleCardBig = (event) => {
    setShowCard(!showCard);
    setCardClicked(event.currentTarget.id);
  }
  
// this selects the selected card to be big or display them all
  const displayCardBig = () => {
    if (showCard === true) {
      let tempArr = cardClicked.split("");
      let cardIndex = tempArr[tempArr.length - 1];
      return <Card
        id="cardBig"
        onClickDiv={toggleCardBig}
        imgId="cardImg"
        imgSrc={data[cardIndex].url}
        name={productsData[cardIndex].name}
        price={productsData[cardIndex].price}
        cart={()=> addToCart(productsData[cardIndex]) } />
    } else {
      return (
        productsData.map((item, index) => {
          return <Card 
            id={`card${index}`}
            key={index} 
            onClickDiv={toggleCardBig}
            imgSrc={data[index].url} 
            name={item.name} 
            price={item.price} 
            cart={()=> addToCart(item) } />
        })
      );
    }
  }
 
  if (loading) return <h1>Loading...</h1>;

  if (error) {
    return (
      <>
        <h1>Error.</h1>
        <h2>{error}</h2>
      </>
    );
  }

  return (
    <div className="container">
      <div className="header">
        <h1>Cats4Lyf</h1>
        <SearchBox onSubmit={handleSubmit} setInput={setInput} input={input}/>
        <button onClick={showCart}> show cart </button>
      </div>
      <div className="sidepanel">
          
            <Sidebar width={300} height={"100vh"}>
              <p>test</p>
              <p>test 2</p>
            </Sidebar>
          </div>
      <div className="content">
        {displayCardBig()}
      </div>
      
    </div>
  )
}


export default App;