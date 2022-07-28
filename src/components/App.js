import { useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom"
import ProtectedRoute from "./ProtectedRoute";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import InfoTooltip from "./InfoTooltip";
import Login from "./Login";
import Register from "./Register";
import api from "../utils/Api";
import auth from "../utils/Auth"
import { CurrentUserContext } from "../contexts/CurrentUserContext";


function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isPendingServerResponse, setIsPendingServerResponse] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [deletedCard, setDeletedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isAuthSuccess, setIsAuthSuccess] = useState(false);
  
  const history = useHistory();

  const ESC_KEY = "Escape";

  useEffect(() => {
    api.batchFetch([api.getUserData(), api.getInitialCards()])
      .then(([userData, initialCards]) => {
        setCurrentUser(userData);
        setCards(initialCards);
      })
      .catch(err => {console.log(err)});
  }, []);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth.checkJWT(jwt)
        .then((data) => {
          if (data) {
            setLoggedIn(true);
            setUserEmail(data.data.email);
            history.push("/");
          }
        })
        .catch(err => {console.log(err)});
    }
  }, []);

  useEffect(() => {
    const handleEscClose = (evt) => {
      if (evt.key ===  ESC_KEY) {
        closeAllPopups();
      }
    }

    window.addEventListener("keydown", handleEscClose);

    return () => window.removeEventListener("keydown", handleEscClose);
  }, []);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard(null);
    setDeletedCard(null);
  }

  const handleCardClick = (cardData) => {
    setSelectedCard(cardData);
  }

  const handleUpdateUser = (userData) => {
    setIsPendingServerResponse(true);

    api.updateUserData(userData)
      .then((newUser) => {
        setCurrentUser(newUser);
        setIsEditProfilePopupOpen(false);
      })
      .catch(err => {console.log(err)})
      .finally(() => {setIsPendingServerResponse(false)})
  }

  const handleUpdateAvatar = (avatarData) => {
    setIsPendingServerResponse(true);

    api.updateUserAvatar(avatarData)
      .then((newUser) => {
        setCurrentUser(newUser);
        setIsEditAvatarPopupOpen(false);
      })
      .catch(err => {console.log(err)})
      .finally(() => {setIsPendingServerResponse(false)});
  }

  const handleAddPlaceSubmit = (placeData) => {
    setIsPendingServerResponse(true);

    api.addNewCard(placeData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        setIsAddPlacePopupOpen(false);
      })
      .catch(err => {console.log(err)})
      .finally(() => {setIsPendingServerResponse(false)});
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(item => item._id === currentUser._id);

    api.handleLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards(cards.map((item) => item._id === card._id ? newCard : item));
      })
      .catch(err => {console.log(err)});
  }

  function handleCardDelete(card) {
    setDeletedCard(card);
  }

  const handleConfirmCardDelete = (evt) => {
    evt.preventDefault();
    setIsPendingServerResponse(true);

    api.deleteCard(deletedCard._id)
      .then(() => {
        setCards(cards.filter(item => item._id !== deletedCard._id));
        setDeletedCard(null);
      })
      .catch(err => {console.log(err)})
      .finally(() => {setIsPendingServerResponse(false)});
  }

  const handleRegister = (email, password) => {
    setIsPendingServerResponse(true);

    auth.register(email, password)
      .then(() => {
        history.push("/sign-in");
      })
      .catch(err => {
        console.log(err);
        setIsAuthSuccess(false);
        setIsInfoTooltipOpen(true);
      })
      .finally(() => {setIsPendingServerResponse(false)});
  }

  const handleLogin = (email, password) => {
    setIsPendingServerResponse(true);

    auth.login(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          setLoggedIn(true);
          setUserEmail(email);
          history.push("/");
          setIsAuthSuccess(true);
          setIsInfoTooltipOpen(true);
        } else {
          return Promise.reject("Ошибка: ответ не содержит данные токена.");
        }
      })
      .catch(err => {
        console.log(err);
        setIsAuthSuccess(false);
        setIsInfoTooltipOpen(true);
      })
      .finally(() => {setIsPendingServerResponse(false)});
  }

  const handleLogout = () => {
    localStorage.setItem("jwt", "");
    setLoggedIn(false);
    setUserEmail("");
    history.push("/sign-in");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header 
        loggedIn={loggedIn}
        userEmail={userEmail}
        onLogout={handleLogout}/>
      <Switch>
        <ProtectedRoute
          exact path="/"
          component={Main}
          cards={cards}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          loggedIn={loggedIn} />
        <Route path="/sign-in">
          <Login onSubmit={handleLogin}/>
        </Route>
        <Route path="/sign-up">
          <Register onSubmit={handleRegister}/>
        </Route>
      </Switch>
      <Footer/>
      <EditProfilePopup 
        isOpen={isEditProfilePopupOpen}
        isPending={isPendingServerResponse}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser} />
      <AddPlacePopup 
        isOpen={isAddPlacePopupOpen}
        isPending={isPendingServerResponse}
        onClose={closeAllPopups}
        onAddPlaceSubmit={handleAddPlaceSubmit} />
      <EditAvatarPopup 
        isOpen={isEditAvatarPopupOpen}
        isPending={isPendingServerResponse}
        onClose={closeAllPopups} 
        onUpdateAvatar={handleUpdateAvatar} />
      <PopupWithForm 
        name="confirm" 
        title="Вы уверены?"  
        isOpen={deletedCard !== null}
        onClose={closeAllPopups}>
        <button className="popup-edit__button-save" type="submit" onClick={handleConfirmCardDelete}>
          {isPendingServerResponse ? "Удаление...": "Да"}
        </button>
      </PopupWithForm>
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      <InfoTooltip isOpen={isInfoTooltipOpen} isSuccess={isAuthSuccess} onClose={closeAllPopups} />
    </CurrentUserContext.Provider>
  );
}

export default App;
