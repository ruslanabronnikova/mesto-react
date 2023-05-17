import React from "react";
import api from "../utils/Api";
import Card from "./Card.js";

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick }) {

  const [userName, setUserName] = React.useState("");
  const [userDescrtiption, setUserDescription] = React.useState("");
  const [userAvatar, setUserAvatar] = React.useState("");
  const [cards, setCards] = React.useState([])

  React.useEffect(() => {
    Promise.all([api.getInitialCards(), api.getInfoUsers()])
      .then(([initialCards, data]) => {
        setUserName(data.name);
        setUserDescription(data.about)
        setUserAvatar(data.avatar)
        setCards(initialCards)
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  }, [])

  return (
    <main className="main">
      <section className="profile">
        <button aria-label="Редактировать аватар" type="button" className="profile__avatar-edtbtn" onClick={onEditAvatar}>
          <img style={{ backgroundImage: `url(${userAvatar})` }} className="profile__avatar"
            name="avataruser" />
        </button>
        <div className="profile__info">
          <h1 className="profile__title">{userName}</h1>
          <p className="profile__subtitle">{userDescrtiption}</p>
          <button aria-label="Редактировать" id="Open" className="profile__button profile__button_act_edit animation-button"
            type="button" onClick={onEditProfile} ></button>
        </div>
        <button aria-label="Добавить" className="profile__button profile__button_act_add animation-button"
          type="button" onClick={onAddPlace}></button>
      </section>

      <section className="elements">
        {cards.map((item) => (
          <Card
          onCardClick={onCardClick}
          card={item}
          key={item._id}
          alt={item.name}
          src={item.link}
          title={item.name}
          like={item.likes.length}
          />
        ))}
      </section>
    </main>
  )
}

export default Main;