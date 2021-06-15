import logo from './logo.svg';
import './App.css';
import { io } from 'socket.io-client';
import { useState } from 'react';

const getSocketClient = () => {
  const client = io('http://localhost:5000');

  // принимаем с сервера список номеров
  client.on('newNumbers', (message) => {
    console.log(message);
  });

  return client;
}


const App = () => {
  const [client, setClient] = useState();

  if (!client) {
    setClient(getSocketClient());
  }

  const addMessage = () => {
    client.emit('addNumber', {number: '88005553535'});
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <h1
          className="App-link"
          onClick={() => addMessage()}
        >
          Кликни на меня и посмотри в консоль
        </h1>
      </header>
    </div>
  );
}

export default App;
