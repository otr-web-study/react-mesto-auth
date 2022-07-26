import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useContext } from "react";

function Card({card, onImageClick, onCardLike, onCardDelete}) {
  const currentUser = useContext(CurrentUserContext);

  const handleImageClick = () => {
    onImageClick(card);
  };

  const handleLikeClick = () => {
    onCardLike(card);
  }

  const handleDeleteClick = () => {
    onCardDelete(card);
  }

  const isOwner = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (
    `card__delete-button button ${!isOwner && "card__delete-button_hidden"}`
  );

  const isLiked = card.likes.some(item => item._id === currentUser._id);
  const cardLikeButtonClassName = (
    `card__like-button button ${isLiked && "card__like-button_active"}`
  )

  return (
    <>
      <img src={card.link} className="card__image" alt={card.name} onClick={handleImageClick}/>
      <button className={cardDeleteButtonClassName} type="button" aria-label="Удалить" onClick={handleDeleteClick}></button>
      <div className="card__content">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like-container">
          <button className={cardLikeButtonClassName} type="button" aria-label="Лайк" onClick={handleLikeClick}></button>
          <span className="card__like-count">{card.likes.length}</span>
        </div>
      </div>
    </>
  );
}

export default Card;