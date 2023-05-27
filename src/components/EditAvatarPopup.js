import React, { useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  };

  return (
    <PopupWithForm name='avatar' title='Обновить аватар' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <input type='url' className='popup__input popup__input_link_value' name="avatar" id="avatar"
        placeholder="Ссылка на картинку" required ref={avatarRef} />
      <span className="popup__item-error nameuser-error" />
    </PopupWithForm>
  )
}

export default EditAvatarPopup;