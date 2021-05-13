import './App.css';
import React, { useState, useEffect } from 'react';
import SearchBox from './components/SearchBox.js';
import Card from './components/Card.js';
import productsData from "./components/Products.json";
import Sidebar from "./components/Sidebar.js"

const API_KEY = process.env.REACT_APP_API_KEY;

// `https://api.thecatapi.com/v1/images/search?api_key=${API_KEY}`

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
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
      const response = await fetch(`https://api.thecatapi.com/v1/images/search?limit=10&mime_types=static&order=desc&api_key=${API_KEY}`);
      if (response.status !== 200) {
        throw new Error ("Failed to fetch cat images");
      }
      const data = await response.json();
      setData(data);
    } catch (Error) {
      setError(Error.message);
    }
  }

  const toggleCardBig = (event) => {
    setShowCard(!showCard);
    setCardClicked(event.currentTarget.id);
  }
  
// She is very friendly and would fit in with a family, including children. Poppy will give her new owner lots of cuddles and she deserves a fantastic new home.

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
        catDetails="catDetails"
        name={productsData[cardIndex].name}
        price={<>{`${productsData[cardIndex].name} is such a pretty cat. They are playful and affectionate and will be ready for her new home very soon.`}<br/><br/>{` ${productsData[cardIndex].name} is very friendly and would fit in with a family, including children. They will give their new owner lots of cuddles and they deserve a fantastic new home.`}<br/><br/>{`The price for ${productsData[cardIndex].name} is ${productsData[cardIndex].price}`}</>}
        buttonId="buttonId"
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
      </div>
      {/* <div className="sidepanel"> */}
          {/* !hidden ? */}
            <Sidebar width={300} height={"100vh"} hidden={""} setHidden={""}>
              <p>test</p>
              <p>test 2</p>
            </Sidebar>
            {/* : <button onClick={set hidden to false}>">"</button> */}
          {/* </div> */}
      <div className="content">
        {displayCardBig()}
      </div>
      
    </div>
  )
}


export default App;