import { useEffect, useRef, useState } from "react";

const Canvas = (props) => {
    const canvasRef = useRef(null);
    const [canvasItems, setCanvasProperties] = useState([
        {text: "Hello world!",x:300, y:300},
        {text: "ok wtf?", x:100, y:100}
    ]);

    function draw(context) {
        context.clearRect(0,0,canvasRef.current.width, canvasRef.current.height);
        context.fillStyle = props.bgcolor;
        context.fillRect(0, 0, 500, 500);
        context.fillStyle = "#000000";
        for(let i = 0; i < canvasItems.length; i++) {
            context.font = "30px Arial";
            context.fillText(canvasItems[i].text, canvasItems[i].x, canvasItems[i].y);
        }
    }

    function onMouseClick(e) {
        if(!canvasItems) return;
        const rect = canvasRef.current.getBoundingClientRect();
        setCanvasProperties((l)=>[...l, {text:props.currentText,x:e.clientX - rect.left,y:e.clientY - rect.top}]);
    }

    useEffect(
        () => {
            if(canvasRef.current) {
                let canvas = canvasRef.current;
                let context = canvas.getContext("2d");
                draw(context);
            }
        },
        [props.bgcolor, canvasItems]
    );
    return (<canvas
        height={props.height}
        width={props.width}
        style={style}
        ref={canvasRef}
        onClick={onMouseClick}
    >
        Your browser does not support html canvas or javascript is disabled.
        </canvas>);
}

const style = {
    border: "5px solid black"
}

export default Canvas;