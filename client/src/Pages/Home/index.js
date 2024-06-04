import React , {useState} from "react";
import {useNavigate} from 'react-router-dom';


const Home = ({socket})=>{
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');

    const handleSubmit =(e)=>{
        e.preventDefault();
        localStorage.setItem('userName',userName);
        socket.emit('newUser', { userName, socketID: socket.id });
        navigate('/chat');
    };
    return(
        <form onSubmit={handleSubmit}>
            <h2>Sign in to Open Chat</h2>
            <label htmlFor="">UserName
            </label>
            <input
            type="text"
            minLength= {6}
            name="username"
            id="username"
            className="username_input"
            value={userName}
            onChange={(e)=>setUserName(e.target.value)}/>
            <button>SIGN IN</button>
        </form>
    )
}
export default Home;