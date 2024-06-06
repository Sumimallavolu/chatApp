import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const Home = ({ socket }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("userName", userName);
    socket.emit("newUser", { userName, socketID: socket.id });
    navigate("/chat");
  };
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form-internal-container">
        <h2>Sign in to Open Chat</h2>
        <div className="input-box">
          <label>UserName</label>
          <input
            type="text"
            minLength={6}
            name="username"
            id="username"
            className="username_input"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <button>SIGN IN</button>
      </form>
    </div>
  );
};
export default Home;
