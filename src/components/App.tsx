import {useEffect, useRef} from 'react';
import spriteSheetUrl from '../catspritesx4.gif';

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;

    // Sprite properties
    const spriteWidth = 87;
    const spriteHeight = 64;
    const numFrames = 6;
    const animationFramesBetweenSpriteFrame = 10;
    let frameX = 0;
    const frameY = 1;
    let gameFrame = 0;

    // Sprite position
    let x = 0;
    const y = canvas.height - spriteHeight;

    // Load sprite image
    const spriteImage = new Image();
    spriteImage.src = spriteSheetUrl;

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update sprite frame
      if (gameFrame % animationFramesBetweenSpriteFrame === 0) {
        frameX = (frameX + 1) % numFrames;
      }

      // Draw sprite
      ctx.drawImage(
        spriteImage,
        frameX * spriteWidth,
        frameY * spriteHeight,
        spriteWidth,
        spriteHeight,
        x,
        y,
        spriteWidth,
        spriteHeight,
      );

      // Move sprite
      x += 2;
      if (x > canvas.width) {
        x = -spriteWidth;
      }

      gameFrame++;
      requestAnimationFrame(animate);
    }

    let animationId = -1;

    spriteImage.onload = function () {
      animationId = requestAnimationFrame(animate);
    };

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="p-8">
      <canvas
        className="mx-auto h-full max-h-[300px] w-full max-w-[400px]"
        ref={canvasRef}
      />
    </div>
  );
}
