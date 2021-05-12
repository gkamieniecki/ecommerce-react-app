import React from 'react';
import './Card.css'


const Card = (props) => {
  return (
    <div className="card" id={props.id} onClick={props.onClickDiv}>
      <img id={props.imgId} className="cat-image" src={props.imgSrc} alt="cat" />
      <div className="catDetails" >
        <h2>{props.name}</h2>
        <p>{props.price}</p>
        <div className="btnContainer" onClick={(e) => e.stopPropagation()}>
          <button onClick={props.cart}>Buy</button>
        </div>
      </div>
    </div>
  )  
}

export default Card