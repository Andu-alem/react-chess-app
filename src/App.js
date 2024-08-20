import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Chess from './Components/Chess';
import Header from './Components/Header';
import { useState } from 'react';

function App() {
  const [twoPlayerMode, setTwoPlayerMode] = useState(false);  
  const [isGameStarted, setIsGameStarted] = useState(false);
  return (
    <div className="container-fluid">
      <Header isGameStarted={ isGameStarted } setTwoPlayerMode={ setTwoPlayerMode }/>
      <Chess twoPlayerMode={ twoPlayerMode } setIsGameStarted={ setIsGameStarted}/>
    </div>
  );
}

export default App;