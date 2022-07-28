import {useInputWithValidation, useFormValid} from "../utils/formValidators";

function AuthForm({isPending, title, buttonTitle, buttonTitlePending, name, onSubmit, children}) {
  const email = useInputWithValidation("", true);
  const password = useInputWithValidation("", true);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit(email.value, password.value);
  }

  const [isFormValid] = useFormValid([email, password]);

  return (
    <form
      className="auth-form"
      onSubmit={handleSubmit}
      name={`${name}Form`}
      id={`${name}Form`}
    >
      <h2 className="auth-form__title">{title}</h2>
      <input
        value={email.value}
        onChange={email.onChange}
        className="auth-form__input"
        placeholder="Email"
        type="email"
        name="email"
        required
        id="auth-form-email"
      />
      <span className={`auth-form__error ${!email.isValid && "auth-form__error_active"}`}>
        {!email.isValid && email.validationMessage}
      </span>
      <input
        value={password.value}
        onChange={password.onChange}
        className="auth-form__input"
        placeholder="Пароль"
        type="password"
        name="password"
        required
        minLength="6"
        id="auth-form-password"
      />
      <span className={`auth-form__error ${!password.isValid && "auth-form__error_active"}`}>
        {!password.isValid && password.validationMessage}
      </span>
      <button 
        className={`button auth-form__button-submit ${!isFormValid && "auth-form__button-submit_inactive"}`}
        disabled={!isFormValid}
        type="submit">
        {isPending ? buttonTitlePending: buttonTitle}
      </button>
      {children}
    </form>
  );
}

export default AuthForm;