function ImagePopup({card, onClose}) {
  const handlePopupMouseDown = (evt) => {
    if (evt.target.classList.contains("popup__close-button")
        || evt.target.classList.contains("popup")) {
      onClose();
    }
  }

  if (card) {
    return (
      <div className="popup popup-preview popup_opened" onMouseDown={handlePopupMouseDown}>
        <div className="popup-preview__container">
          <img className="popup-preview__image" src={card.link} alt={card.name}/>
          <button 
            className="popup__close-button button" 
            type="button" 
            aria-label="Закрыть"/>
          <p className="popup-preview__caption">{card.name}</p>
        </div>
      </div>
    );
  }
  return "";
}

export default ImagePopup;