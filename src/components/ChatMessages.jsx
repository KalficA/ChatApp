import React, { useContext, useEffect, useRef } from "react";
import ChatContext from "./context/ChatContext";
import UserContext from "./context/UserContext";
import "../css/Style.css";

export default function ChatMessageList() {
  const { messageArray } = useContext(ChatContext);
  const { user } = useContext(UserContext);
  const bottomRef = useRef();

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ block: "end", behavior: "smooth" });
    }
  }, [messageArray]);

  function getMessageWrapperClass(message) {
    return `c-message__item ${
      user.id === message.user.id ? "my-item" : "others-item"
    }`;
  }

  function getUsernameDisplayStyle(message) {
    return `c-message__message__username ${
      user.id === message.user.id ? "my-username" : "others-username"
    }`;
  }

  function getMessageDisplayStyle(message) {
    return `c-message__message__text ${
      user.id === message.user.id ? "my-message" : "others-message"
    }`;
  }

  return (
    <div className="c-messages">
      {messageArray.map((msg) => {
        if (msg.type === "joined_chat") {
          return (
            <div
              className="c-message__item c-message__joined-left"
              key={msg.id}
            >
              <div className="c-message--joined">
                {msg.user.username} {msg.message}
              </div>
            </div>
          );
        } else if (msg.type === "left_chat") {
          return (
            <div
              className="c-message__item c-message__joined-left"
              key={msg.id}
            >
              <div className="c-message--left">
                {msg.user.username} {msg.message}
              </div>
            </div>
          );
        } else {
          return (
            <div className={getMessageWrapperClass(msg)} key={msg.id}>
              <div className="c-message__avatar">{msg.user.avatar}</div>

              <div className="c-message__message-item">
                <div className={getUsernameDisplayStyle(msg)}>
                  <div>{msg.user.username}</div>
                </div>
                <div className={getMessageDisplayStyle(msg)}>{msg.message}</div>
              </div>
            </div>
          );
        }
      })}
      <div className="bottomContainerElement" ref={bottomRef}></div>
    </div>
  );
}
