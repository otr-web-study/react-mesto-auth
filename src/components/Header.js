import logo from "../images/logo.svg";
import ProtectedRoute from "./ProtectedRoute";
import { Route, Link, Switch } from "react-router-dom";
import HeaderProfile from "./HeaderProfile";

function Header() {
  return (
    <header className="header page__header">
      <img className="header__logo" src={logo} alt=""/>
      <Switch>
        <Route path={"/sign-in"}>
          <Link to="/sign-up" className="link header__link">Регистрация</Link>
        </Route>
        <Route path={"/sign-up"}>
          <Link to="/sign-in" className="link header__link">Войти</Link>
        </Route>
        <ProtectedRoute exact path="/" component={HeaderProfile} />
      </Switch>
    </header>
  );
}

export default Header;