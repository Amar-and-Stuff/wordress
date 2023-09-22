import { useState } from 'react';
import './App.css';

function App() {
  let [backgroundColor, setBackgroundColor] = useState("#ffffff");
  let [cursorText, setCursorText] = useState("Hello click!!");
  let [htmlString, setHTMLString] = useState("");

  return (
    <div className="App">
      <div className='ToolBar'>
        <label>select bg color:</label>
        <input type='color' defaultValue={backgroundColor} onInput={(e)=>{setBackgroundColor(e.target.value)}}></input>
      </div>
      
      <div className="DrawingContainer">
        <div className='DrawingPlace' style={{backgroundColor:backgroundColor}}>
        <div dangerouslySetInnerHTML={{__html:htmlString+"<div style=\"color:red;\">"+cursorText+"</div>"}}></div>
        </div>
      </div>
      <input className='InputBox' placeholder='enter text to display on click' onInput={(e)=>{setCursorText(e.target.value);}} defaultValue={cursorText}></input>
      <button onClick={()=>{setHTMLString(htmlString+"<div>"+cursorText+"</div>")}}>Add</button>
    </div>
  );
}

export default App;
