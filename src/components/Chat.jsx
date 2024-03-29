import React, { useContext, useEffect, useState } from "react";
import ChatContext from "./context/ChatContext";
import UserContext from "./context/UserContext";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatMemberList from "./ChatMembers";
import SendMessage from "./SendMessage";
import "../css/Style.css";

const DEFAULT_ROOM_NAME = "observable-default-room";

export default function Chat() {
  const { user, drone, userLogout } = useContext(UserContext);

  const [messageArray, setMessageArray] = useState([]);
  const [membersArray, setMembersArray] = useState([]);

  useEffect(() => {
    if (user) {
      initializeChatRoom(drone);
    }
  }, [user, drone]);

  function initializeChatRoom(scaledrone) {
    scaledrone.on("error", (error) => console.error(error));

    const room = scaledrone.subscribe(DEFAULT_ROOM_NAME);

    room.on("error", (error) => console.error(error));

    room.on("members", function (members) {
      setMembersArray([...members]);
    });

    room.on("member_join", function (member) {
      setMembersArray(function (current) {
        return [...current, member];
      });

      setMessageArray((current) => [
        ...current,
        {
          message: "joined the chat!",
          id: Math.random(),
          type: "joined_chat",
          user: {
            username: member.clientData.username,
            avatar: member.clientData.avatar,
          },
        },
      ]);
    });

    room.on("member_leave", function (member) {
      setMembersArray((current) =>
        current.filter((oneMember) => oneMember.id !== member.id)
      );

      setMessageArray((current) => [
        ...current,
        {
          message: "left the chat!",
          id: Math.random(),
          type: "left_chat",
          user: {
            username: member.clientData.username,
            avatar: member.clientData.avatar,
          },
        },
      ]);
    });

    room.on("message", (message) => {
      setMessageArray((current) => [
        ...current,
        {
          message: message.data.message,
          id: message.id,
          type: "MESSAGE",
          user: {
            id: message.member.id,
            username: message.member.clientData.username,
            avatar: message.member.clientData.avatar,
          },
        },
      ]);
    });
    /* Spremanje poruka i informacija o porukama u array */
  }

  function publishMessage(message) {
    drone.publish({
      room: DEFAULT_ROOM_NAME,
      message: { message },
    });
  }

  function onClickLogout() {
    userLogout();
  }

  return (
    <div className="chat">
      <ChatContext.Provider
        value={{
          publishMessage,
          onClickLogout,
          messageArray,
          membersArray,
          user,
        }}
      >
        <div className="chat__header">
          <ChatHeader />
        </div>
        <div className="chat__main">
          <div className="chat__main-item">
            <div className="chat__main-members">
              <ChatMemberList />
            </div>
            <div className="chat__main-messages">
              <ChatMessages />
            </div>
          </div>
        </div>
        <div className="chat__footer">
          <SendMessage />
        </div>
      </ChatContext.Provider>
    </div>
  );
}
