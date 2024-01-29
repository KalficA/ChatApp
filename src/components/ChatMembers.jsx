import React, { useContext } from "react";
import ChatContext from "./context/ChatContext";
import "../css/Style.css";

export default function ChatMemberList() {
  const { membersArray } = useContext(ChatContext);

  return (
    <div className="c-member-list__item">
      {/* Prikaz svih aktivnih sudionika u chatu */}
      <div>Active participants:</div>
      {membersArray.map((member) => (
        <div className="c-member-list__member__item" key={member.id} style={{ backgroundColor: member.clientData.color }}>
          <span className="c-member-list__member__avatar">
            {member.clientData.avatar}
          </span>
          <span className="c-member-list__member__username">
            {member.clientData.username}
          </span>
        </div>
      ))}
    </div>
  );
}
