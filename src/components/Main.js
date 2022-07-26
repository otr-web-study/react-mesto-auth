import {useContext} from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({cards, onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete}) {
  const currentUser = useContext(CurrentUserContext);

  const cardsElement = cards.map(item => {
    return (
      <li key={item._id} className="card">
        <Card 
          card={item} 
          onImageClick={onCardClick} 
          onCardLike={onCardLike}
          onCardDelete={onCardDelete}/>
      </li>
    )});

  return (
    <main>
      <section className="profile page__profile">
        <div className="profile__avatar-container">
          <img className="profile__avatar" src={currentUser.avatar} alt="Фото профиля пользователя."/>
          <button 
            className="profile__avatar-edit-button" 
            type="button" 
            aria-label="Редактировать"
            onClick={onEditAvatar}></button>
        </div>
        <div className="profile__info">
          <div className="profile__author-container">
            <h1 className="profile__author">{currentUser.name}</h1>
            <button 
              className="profile__edit-button button" 
              type="button" 
              aria-label="Редактировать"
              onClick={onEditProfile}></button>
          </div>
          <p className="profile__bio">{currentUser.about}</p>       
        </div>
        <button 
          className="profile__add-button button" 
          type="button" 
          aria-label="Добавить"
          onClick={onAddPlace}></button>
      </section>
      <section className="elements page__elements">
        <ul className="elements__list">
          {cardsElement}
        </ul>
      </section>
    </main>
  );
}

export default Main;