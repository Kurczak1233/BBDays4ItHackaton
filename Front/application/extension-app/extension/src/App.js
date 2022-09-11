import './App.css';
import { changeColor } from './main';

function App() {

  // document.getElementById("myBtn").addEventListener("click", displayDate); //Zmieni się url na translate -> podmień zdjęcia.

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={changeColor}>
          Change color
        </button>
      </header>
    </div>
  );
}

export default App;
