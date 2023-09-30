import { useState, useRef, useEffect } from 'react';
import './App.css';
import Canvas from './Components/Canvas';
import TextPreview from "./Components/TextPreview"

function App() {
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [currentText, setCurrentText] = useState("New Text");
  const [currentTextDimensions, setCurrentTextDimensions] = useState({width:null, height:null});
  const textPreviewRef = useRef(null);

  function handleInput(event) {
    const value = event.target.value;
    setCurrentText(value);
  }

  useEffect(()=>{
    if(textPreviewRef.current) {
      setCurrentTextDimensions({width:textPreviewRef.current.clientWidth, height:textPreviewRef.current.clientHeight});
      
    }
  },[])

  return (
    <div className="App">
      <div className='ToolBar'>
        <label>select bg color:</label>
        <input type='color' defaultValue={backgroundColor} onInput={(e)=>{setBackgroundColor(e.target.value)}}></input>
        <input type='text' defaultValue={currentText} onInput={handleInput}></input>
      </div>
      <Canvas height={500} width={500} bgcolor={backgroundColor} currentText={currentText} textDimensions={currentTextDimensions}/>
      <TextPreview ref={textPreviewRef} text={currentText} style={{font:"20px Arial"}}/>
    </div>
  );
}

export default App;
