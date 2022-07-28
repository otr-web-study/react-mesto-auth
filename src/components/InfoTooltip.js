function InfoTooltip({isOpen, isSuccess, onClose}) {
  const handlePopupMouseDown = (evt) => {
    if (evt.target.classList.contains("popup__close-button")
        || evt.target.classList.contains("popup")) {
      onClose();
    }
  };

  return (
    <div 
      className={`popup info-tooltip ${isOpen && "popup_opened"}`} onMouseDown={handlePopupMouseDown}>
      <div className="info-tooltip__container">
        <div className={`info-tooltip__status ${isSuccess ? "info-tooltip__status_type_success" : "info-tooltip__status_type_fail"}`}>
        </div>
        <h2 className="info-tooltip__title">
          {isSuccess ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте еще раз."}
        </h2>
        <button 
          className="popup__close-button button" 
          type="button" 
          aria-label="Закрыть"/>
      </div>
    </div>
  );
}

export default InfoTooltip;