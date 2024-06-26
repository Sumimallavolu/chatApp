import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import "./App.css";
import ChatPage from "./Pages/ChatPage/index";
import socketIO from "socket.io-client";
const socket = socketIO.connect("http://localhost:4000");

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Home socket={socket} />}></Route>
        <Route path="/chat" element={<ChatPage socket={socket} />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
