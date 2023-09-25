import { useState } from 'react';
import './App.css';
import Canvas from './Components/Canvas';

function App() {
  let [backgroundColor, setBackgroundColor] = useState("#ffffff");
  let [currentText, setCurrentText] = useState("New Text");

  return (
    <div className="App">
      <div className='ToolBar'>
        <label>select bg color:</label>
        <input type='color' defaultValue={backgroundColor} onInput={(e)=>{setBackgroundColor(e.target.value)}}></input>
        <input type='text' defaultValue={currentText} onInput={(e)=>{setCurrentText(e.target.value)}}></input>
      </div>
      <Canvas height={500} width={500} bgcolor={backgroundColor} currentText={currentText}/>

    </div>
  );
}

export default App;
