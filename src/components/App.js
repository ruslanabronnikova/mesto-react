import React, { useState } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';


function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);

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

  return (
    <div className='page'>
      <Header />
      <Main
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
      />
      <Footer />
      <PopupWithForm name='profile' title='Редактировать профиль' isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
        <input type='text' className='popup__input popup__input_name_value' name="nameuser" id="nameuser"
          placeholder="Имя" minLength="2" maxLength="40" title="Длина поля должна быть 2 и более символов и менее или равно 40" required />
        <span className="popup__item-error nameuser-error" />
        <input type='text' className='popup__input popup__input_career_value' name="aboutuser" id="aboutuser"
          placeholder="Описание" minLength="2" maxLength="200" title="Длина поля должна быть 2 и более символов и менее или равно 200" required />
        <span className="popup__item-error nameuser-error" />
      </PopupWithForm>

      <PopupWithForm name='card' title='Новое Место' buttonText='Создать' isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
        <input type='text' className='popup__input popup__input_title_value' name="name" id="titlecard"
          placeholder="Название" minLength="2" maxLength="30" required />
        <span className="popup__item-error nameuser-error" />
        <input type='url' className='popup__input popup__input_link_value' name="link" id="linkcard"
          placeholder="Ссылка на картинку" required />
        <span className="popup__item-error linkcard-error" />
      </PopupWithForm>

      <PopupWithForm name='avatar' title='Обновить аватар' isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
        <input type='url' className='popup__input popup__input_link_value' name="avatar" id="avatar"
          placeholder="Ссылка на картинку" required />
        <span className="popup__item-error nameuser-error" />
      </PopupWithForm>

      <ImagePopup card={selectedCard} onClose={closeAllPopups}></ImagePopup>
    </div>
  );
}

export default App;
