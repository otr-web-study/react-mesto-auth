import PopupWithForm from "./PopupWithForm";
import {useContext, useEffect} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import {useInputWithValidation, useFormValid} from "../utils/formValidators";

function EditProfilePopup({isOpen, isPending, onClose, onUpdateUser}) {
  const currentUser = useContext(CurrentUserContext);

  const name = useInputWithValidation("", isOpen);
  const description = useInputWithValidation("", isOpen);

  useEffect(() => {
    name.setValue(currentUser.name || "");
    description.setValue(currentUser.about || "");
  }, [currentUser, isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateUser({
      name: name.value,
      about: description.value,
    });
  }

  const [isFormValid] = useFormValid([name, description]);

  return (
    <PopupWithForm 
      name="profile" 
      title="Редактировать профиль" 
      buttonTitle="Сохранить"
      buttonTitleInAction="Сохранение..."
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>
      <input 
        id="author-name"
        type="text" 
        className="popup-edit__input popup-edit__input_type_name" 
        name="name"
        required
        minLength="2"
        maxLength="40"
        placeholder="Имя"
        value={name.value}
        onChange={name.onChange}/>
      <span className={`popup-edit__error author-name-error ${!name.isValid && "popup-edit__error_active"}`}>
        {!name.isValid && name.validationMessage}
      </span>
      <input 
        id="author-option"
        type="text" 
        className="popup-edit__input popup-edit__input_type_option" 
        name="about"
        required
        minLength="2"
        maxLength="200"
        placeholder="О себе"
        value={description.value}
        onChange={description.onChange}/>
      <span className={`popup-edit__error author-option-error ${!description.isValid && "popup-edit__error_active"}`}>
        {!description.isValid && description.validationMessage}
      </span>
      <button 
        className={`popup-edit__button-save ${!isFormValid && "popup-edit__button-save_inactive"}`}
        type="submit" 
        onClick={handleSubmit}
        disabled={!isFormValid}>
        {isPending ? "Сохранение...": "Сохранить"}
      </button>
    </PopupWithForm>
  )
}

export default EditProfilePopup;