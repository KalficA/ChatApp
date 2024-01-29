import React, { useContext } from "react";
import ChatContext from "./context/ChatContext";
import "../css/Style.css";

export default function ChatHeader() {
  const { onClickLogout, user } = useContext(ChatContext);

  return (
    <div className="c-header__item">
      <div className="c-header__button__item">
        <button className="c-header__button" onClick={onClickLogout} type="submit">
          Log out
        </button>
      </div>
      <div className="c-header__greetings__item">
        <div>Hello {user.username}! <p className="chat__welcome-message">Start chatting with all participants in this conversation.</p></div>
       
      </div>
    </div>
  );
}
