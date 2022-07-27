import React from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function HeaderProfile() {
  const value = React.useContext(AuthContext);
  console.log(value);
  return (
    <div className="header__profile">
      <p className="header__email">{value.email}</p>
      <Link to="/sign-in" onClick={value.handleLogout} className="link header__link header__link_logged-in">Выйти</Link>
    </div>
  )
}