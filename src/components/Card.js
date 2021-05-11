import React from 'react';
import './Card.css'

const Card = (props) => {
  return (
    <div className="card">
      <img className="cat-image" src={props.imgSrc} alt="cat" />
      <div className="catDetails">
        <h2>{props.name}</h2>
        <p>{props.price}</p>
        <div className="btnContainer">
          <button>Buy</button>
        </div>
      </div>
    </div>
  )  
}

export default Card