import React, { useContext, useState } from "react";
import UserContext from "./context/UserContext";
import "../App.css";

export default function Login() {
  const [, setUsername] = useState(null);
  const [avatar, setAvatar] = useState("👩‍🚀");

  const generateRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };


  const { onUserLogin } = useContext(UserContext);

  const generateRandomNames = () => {
    const adjectives = ["Red", "Happy", "Sunny", "Brave", "Funny", "Clever", "Adventurous", "Loyal", "Gentle", "Energetic"];
    const animals = ["Snake", "Fox", "Tiger", "Bear", "Dolphin", "Lion", "Eagle", "Kangaroo", "Penguin", "Cheetah"];
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const animal = animals[Math.floor(Math.random() * animals.length)];
    return `${adjective} ${animal}`;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const generatedUsername = generateRandomNames();
    const generatedColor = generateRandomColor();
    console.log(generatedColor);
    setUsername(generatedUsername);
    onUserLogin(generatedUsername, avatar, generatedColor);
  };
  return (
    <div className="login-page">
      <div className="form-wrapper">
        <div>
          <form className="form" onSubmit={handleLogin}>
            
            <div className="form-control">
              <div>
                <label htmlFor="avatar">Choose your icon</label>
              </div>
              <select
                className="form__avatar-input"
                onChange={(e) => setAvatar(e.target.value)}
              >
                <option value="👩‍🚀">👩‍🚀</option>
                <option value="🕵️‍♂️">🕵️‍♂️</option>
                <option value="👨‍🎨">👨‍🎨</option>
                <option value="👩‍🍳">👩‍🍳</option>
                <option value="🧙‍♂️">🧙‍♂️</option>
                <option value="🤴">🤴</option>
                <option value="👸">👸</option>
                <option value="🧚‍♀️">🧚‍♀️</option>
                <option value="🦸‍♂️">🦸‍♂️</option>
                <option value="🦹‍♀️">🦹‍♀️</option>
                <option value="👮‍♂️">👮‍♂️</option>
                <option value="👷‍♀️">👷‍♀️</option>
                <option value="🧟‍♂️">🧟‍♂️</option>
                <option value="🧜‍♀️">🧜‍♀️</option>
                <option value="👳‍♂️">👳‍♂️</option>
                <option value="🕵️‍♀️">🕵️‍♀️</option>
                <option value="👩‍🌾">👩‍🌾</option>
                <option value="🧕">🧕</option>
                <option value="🕺">🕺</option>
                <option value="💂‍♂️">💂‍♂️</option>
              </select>
            </div>
            <div className="form-control">
              <button type="submit" className="form__login-button">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
