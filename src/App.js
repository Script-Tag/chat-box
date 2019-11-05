import React from 'react';
import logo from './logo.svg';
import ChatBox from "./Components/ChatBox";
import AddTimer from "./AddTimer";
import HomeScreen from "./HomeScreen";


function App() {
  return (
    <div className="App">
      {/* <AddTimer /> */}
      <HomeScreen />
      <ChatBox />
    </div>
  );
}

export default App;
