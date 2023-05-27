import React, { useState, useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import api from "../utils/Api";
import CurrentUserContext from '../contexts/CurrentUserContext';
import CurrentCardsContext from '../contexts/CurrentCardsContext';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);

  const [currentUser, setCurrentUser] = useState({});

  const [currentCards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([api.getInitialCards(), api.getInfoUsers()])
      .then(([initialCards, userData]) => {
        setCurrentUser(userData);
        setCards(initialCards); 
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  }, [])

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCard(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
  }

  function handleCardDeleteCard(card) {

    api.deleteCard(card._id).then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id));
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
  }

  function handleUpdateUser({ name, about }) {
    api.editProfileUsers(name, about)
      .then((res) => {
        setCurrentUser(res);
        setIsEditProfilePopupOpen(false);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  }

  function handleUpdateAvatar({ avatar }) {
    api.editAvatarProfile(avatar)
      .then((res) => {
        setCurrentUser(res);
        setIsEditAvatarPopupOpen(false);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  }

  function handleAddNewCard({ name, link }) {
    api.addNewCards(name, link)
      .then((newCard) => {
        setCards([newCard, ...currentCards]);
        setIsAddPlacePopupOpen(false);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  }

  return (
    <div className='page'>
      <CurrentUserContext.Provider value={currentUser}>
        <CurrentCardsContext.Provider value={currentCards}>
          <Header />
          <Main
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDeleteCard}
          />
          <Footer />

          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onNewCard={handleAddNewCard} />

          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

          <ImagePopup card={selectedCard} onClose={closeAllPopups}></ImagePopup>
        </CurrentCardsContext.Provider>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
