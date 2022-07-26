function PopupWithForm({name, title, isOpen, children, onClose}) {
  const handlePopupMouseDown = (evt) => {
    if (evt.target.classList.contains("popup__close-button")
        || evt.target.classList.contains("popup")) {
      onClose();
    }
  }

  return (
    <div 
      className={`popup popup-edit popup-edit_type_${name} ${isOpen && "popup_opened"}`}
      onMouseDown={handlePopupMouseDown}>
      <section className="popup-edit__container">
        <button 
          className="popup__close-button button" 
          type="button" 
          aria-label="Закрыть"/>
        <form className="popup-edit__form" name={`${name}Form`} id={`${name}Form`} noValidate>
          <h2 className="popup-edit__title">{title}</h2>
          {children}
        </form>
      </section>
    </div>
  );
}

export default PopupWithForm;