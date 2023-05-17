import React from "react";

function Card({card, onCardClick}) {

  function handleClick() {
    onCardClick(card);
  }

  return(
    <div className="element" key={card._id} onClick={handleClick}>
    <img className="element__image" src={card.link}/>
    <h2 className="element__title">{card.name}</h2>
    <div className="element__likes">
      <button aria-label="Нравится" className="element__buttonlike" type="button"></button>
      <p className="element__counterlike">{card.likes.length}</p>
    </div>
    <button aria-label="Нравится" className="element__buttondel" type="button"></button>
  </div>
  )
}

export default Card;