import { useEffect, useRef, useState } from "react";

const Canvas = (props) => {
    const canvasRef = useRef(null);
    const mousePosition = useRef({ x: 20, y: 20 });
    const [canvasItems, setCanvasProperties] = useState([
        { text: "New Text", x: 20, y: 20, hovered: false, width: 100, height: 20 }
    ]);

    function draw(context) {
        context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        context.fillStyle = props.bgcolor;
        context.fillRect(0, 0, props.width, props.height);
        context.fillStyle = "#000000";
        context.textBaseline = "top";
        let lineHeight = context.measureText('M').width * 1.3;
        for (let i = 0; i < canvasItems.length; i++) {
            context.font = "20px Arial";
            context.fillText(canvasItems[i].text, canvasItems[i].x, canvasItems[i].y);
            if (canvasItems[i].hovered)
                context.strokeRect(canvasItems[i].x, canvasItems[i].y, context.measureText(canvasItems[i].text).width, lineHeight);
        }
    }

    function onMouseClick(e) {
        if (!canvasItems) return;
        setCanvasProperties((l) => [...l, { text: props.currentText, x: mousePosition.current.x, y: mousePosition.current.y, hovered: false, width: 100, height: 20 }]);
        // console.log({text:props.currentText,x:mousePosition.current.x,y:mousePosition.current.y, hovered:false});
    }

    function mousePositionUpdate(e) {
        const rect = canvasRef.current.getBoundingClientRect();
        mousePosition.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
        let cursorCanGrab = false;
        for (let i = 0; i < canvasItems.length; i++) {
            if (
                mousePosition.current.x >= canvasItems[i].x && mousePosition.current.x <= canvasItems[i].x + canvasItems[i].width &&
                mousePosition.current.y >= canvasItems[i].y && mousePosition.current.y <= canvasItems[i].y + canvasItems[i].height
            ) {
                setCanvasProperties((l) => {
                    let updatedList = [...l];
                    updatedList[i].hovered = true;
                    return updatedList;
                });
                cursorCanGrab = true;
            }
            else {
                setCanvasProperties((l) => {
                    let updatedList = [...l];
                    updatedList[i].hovered = false;
                    return updatedList;
                });
            }
            if (cursorCanGrab) {
                document.body.style.cursor = "move";
            }
            else {
                document.body.style.cursor = "default";
            }
        }
    }

    useEffect(
        () => {
            if (canvasRef.current) {
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
        onMouseMove={mousePositionUpdate}
    >
        Your browser does not support html canvas or javascript is disabled.
    </canvas>);
}

const style = {
    border: "5px solid black"
}

export default Canvas;