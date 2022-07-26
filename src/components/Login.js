import AuthForm from "./AuthForm";

function Login(props) {
  return (
    <section className="auth page__auth">
      <AuthForm 
        isPending={false}
        title="Вход"
        buttonTitle="Войти"
        buttonTitlePending="Вход..."
        name="login"
        {...props} />
    </section>
  )
}

export default Login;