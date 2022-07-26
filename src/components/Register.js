import { Link } from "react-router-dom";
import AuthForm from "./AuthForm";

function Register(props) {
  return (
    <section className="auth page__auth">
      <AuthForm 
        isPending={false}
        title="Регистрация"
        buttonTitle="Зарегистрироваться"
        buttonTitlePending="Регистрация..."
        name="register"
        {...props}>
        <Link to="/sign-in" className="auth-form__link link">Уже зарегистрированы? Войти</Link>
      </AuthForm>
    </section>
  )
}

export default Register;