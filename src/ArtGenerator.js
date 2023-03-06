import React, { useState, useEffect, useRef } from 'react';
import p5 from 'p5';

const ArtGenerator = () => {
  const canvasRef = useRef(null);
  const [sliderValue, setSliderValue] = useState(50);

  useEffect(() => {
    const sketch = new p5((p) => {
      p.setup = () => {
        p.createCanvas(400, 400).parent(canvasRef.current);
        p.noFill();
      };

      p.draw = () => {
        p.background(255);
        const numPoints = Math.floor(sliderValue / 10);
        const angle = p.TWO_PI / numPoints;

        p.strokeWeight(2);
        p.beginShape();
        for (let i = 0; i < numPoints; i++) {
          const x = 200 + sliderValue * p.cos(angle * i);
          const y = 200 + sliderValue * p.sin(angle * i);
          p.vertex(x, y);
        }
        p.endShape(p.CLOSE);
      };
    });

    return () => {
      sketch.remove();
    };
  }, [sliderValue]);

  return (
    <div>
      <div>
        <label htmlFor="slider">Slider:</label>
        <input
          type="range"
          min="10"
          max="100"
          value={sliderValue}
          onChange={(e) => setSliderValue(e.target.value)}
          id="slider"
        />
      </div>
      <div ref={canvasRef}></div>
    </div>
  );
};

export default ArtGenerator;
