import './App.css';
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket =io('http://localhost:5000');
function App() {
  const [message, setMessage] = useState('')
  const [recievedMessage, setRecievedMessage] = useState([]);

  const sendMessage = (e) => {
    // console.log(message);
    e.preventDefault();
    socket.emit('message', {message})
    setMessage('')

  }

  useEffect(()=>{
    socket.on('message', payload => {
      setRecievedMessage([...recievedMessage, payload])
    })
  })
  return (
    <div className="App">
    <h1>Chat App</h1>
    <form onSubmit={sendMessage}>

      <input type='text' 
      name= 'message' 
      placeholder='Type Message...'
      value={message}
      onChange={e => setMessage(e.target.value)} />

      <button type ='submit'>Send</button>
    </form>
    {recievedMessage.map((payload,index)=>{
      return(
      <h3>{payload.message}</h3>

      )
    })}
      
    </div>
  )
}

export default App;
