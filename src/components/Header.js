import logo from "../images/logo.svg";
import ProtectedRoute from "./ProtectedRoute";
import { Route, Link, Switch } from "react-router-dom";
import HeaderProfile from "./HeaderProfile";
import { useState } from "react";

function Header(props) {
  const [isHamburgerToggle, setIsHamburgerToggle] = useState(false);

  const handleHamburgerToggle = () => {
    setIsHamburgerToggle(!isHamburgerToggle);
  }

  return (
    <header className={`header page__header ${props.loggedIn && "header_mobile"}`}>
      <img className="header__logo" src={logo} alt=""/>
      <label className={`hamburger ${props.loggedIn && "hamburger_active"}`} htmlFor="menu-toggle">
        <input 
          id="menu-toggle" 
          value={isHamburgerToggle}
          onChange={handleHamburgerToggle} 
          className="hamburger__menu-toggle" 
          type="checkbox" />
        <div className="hamburger__menu-button" />
      </label>
      <Switch>
        <Route path="/sign-in">
          <Link to="sign-up" className="link header__link">Регистрация</Link>
        </Route>
        <Route path="/sign-up">
          <Link to="sign-in" className="link header__link">Войти</Link>
        </Route>
        <ProtectedRoute exact path="/" component={HeaderProfile} {...props} isActive={isHamburgerToggle} />
      </Switch>
    </header>
  );
}

export default Header;