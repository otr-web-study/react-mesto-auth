import { Link } from "react-router-dom";

export default function HeaderProfile({userEmail, onLogout, isActive}) {
  return (
    <div className={`header__profile ${!isActive && "header__profile_inactive"}`}>
      <p className="header__email">{userEmail}</p>
      <Link to="/sign-in" onClick={onLogout} className="link header__link header__link_logged-in">Выйти</Link>
    </div>
  )
}