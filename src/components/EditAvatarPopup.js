import PopupWithForm from "./PopupWithForm";
import {useInputRefWithValidation, useFormValid} from "../utils/formValidators";

function EditAvatarPopup({isOpen, isPending, onClose, onUpdateAvatar}) {
  const url = useInputRefWithValidation("", isOpen);

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateAvatar({
      avatar: url.ref.current.value,
    });
  }

  const [isFormValid] = useFormValid([url]);
  
  return (
    <PopupWithForm 
      name="avatar" 
      title="Обновить аватар" 
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>
      <input
        ref={url.ref}
        id="avatar-option" 
        type="url" 
        className="popup-edit__input popup-edit__input_type_option-avatar"  
        name="link"
        required
        placeholder="Ссылка на картинку"
        onChange={url.onChange}/>
      <span className={`popup-edit__error avatar-option-error ${!url.isValid && "popup-edit__error_active"}`}>
        {!url.isValid && url.validationMessage}
      </span>
      <button 
        className={`popup-edit__button-save ${!isFormValid && "popup-edit__button-save_inactive"}`} 
        type="submit" 
        onClick={handleSubmit}
        disabled={!isFormValid}>
        {isPending ? "Сохранение...": "Сохранить"}
      </button>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;