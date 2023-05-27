import React, { useState, useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onNewCard }) {

  const nameRef = useRef(null);
  const linkRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();

    onNewCard({
      name: nameRef.current.value,
      link: linkRef.current.value
    })

    // Сброс значений полей формы
    nameRef.current.value = '';
    linkRef.current.value = '';
  }

  return (
    <PopupWithForm name='card' title='Новое Место' buttonText='Создать' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <input type='text' className='popup__input popup__input_title_value' name="name" id="name"
        placeholder="Название" minLength="2" maxLength="30" required ref={nameRef} />
      <span className="popup__item-error nameuser-error" />
      <input type='url' className='popup__input popup__input_link_value' name="link" id="link" ref={linkRef}
        placeholder="Ссылка на картинку" required />
      <span className="popup__item-error linkcard-error" />
    </PopupWithForm>
  )
}

export default AddPlacePopup