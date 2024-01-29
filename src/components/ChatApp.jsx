import React, { useState } from "react";
import Login from "./Login";
import Chat from "./Chat";
import UserContext from "./context/UserContext";

const CHANNEL_ID = "K4SldZm7aIaYUSM9";

export default function AnotherChatApp() {
  const [user, setUser] = useState("");
  const [drone, setDrone] = useState(null);

  function handleUserLogin(username, avatar, color) {
    if (username) {
      const newDrone = new window.Scaledrone(CHANNEL_ID, {
        data: { username, avatar, color },
        /* Definiranje korisničkih karakteristika */
      });
      /* Spajanje sa ScaleDrone servisom */

      newDrone.on("open", () => {
        setDrone(newDrone);
        setUser({ id: newDrone.clientId, username, avatar, color });
      });
    }
  }

  function handleUserLogout() {
    if (drone) {
      drone.close();
      setDrone(null);
      setUser(null);
    }
  }

  return (
    <div>
      <UserContext.Provider value={{ user, drone, onUserLogin: handleUserLogin, onUserLogout: handleUserLogout }}>
        {!user ? <Login /> : <Chat />}
        {/* Ako korisnik nije prijavljen, stavi ga na login, u suprotnom prebaci ga na chat */}
      </UserContext.Provider>
    </div>
  );
}
