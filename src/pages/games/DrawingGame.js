import React, { useRef, useState } from 'react';
import './GameStyles.css';

function DrawingGame() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#ff1493');
  const [brushSize, setBrushSize] = useState(5);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ctx.lineTo(x, y);
    ctx.strokeStyle = color;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const downloadDrawing = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.href = canvas.toDataURL();
    link.download = 'my-drawing.png';
    link.click();
  };

  return (
    <div className="game-container">
      <h2 className="game-title">🎨 Drawing Game</h2>
      
      <div className="drawing-controls">
        <div className="control-group">
          <label>Color:</label>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="color-picker"
          />
        </div>
        <div className="control-group">
          <label>Brush Size: {brushSize}px</label>
          <input
            type="range"
            min="1"
            max="50"
            value={brushSize}
            onChange={(e) => setBrushSize(e.target.value)}
            className="brush-slider"
          />
        </div>
        <button className="reset-btn" onClick={clearCanvas}>Clear</button>
        <button className="reset-btn" onClick={downloadDrawing}>Download</button>
      </div>

      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        className="drawing-canvas"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      />
    </div>
  );
}

export default DrawingGame;