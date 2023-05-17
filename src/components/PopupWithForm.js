import React from "react";

function PopupWithForm({ name, title, buttonText, children, isOpen, onClose }) {
  return (
    <div className={`popup popup_mesto_${name} ${isOpen ? "popup_opene" : ""}`}>
      <div className="popup__body">
        <form className="popup__container" name={name} id="profileform" method="post">
          <h2 className="popup__title">{title}</h2>
          <fieldset className="popup__items">
            <div className="popup__item"> 
              {children}
              <button type="button" id="close"
                className="popup__button popup__button-close animation-button" onClick={onClose}></button>
              <button type="submit" id="save"
                className="popup__button popup__button-submit">{buttonText}</button>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;