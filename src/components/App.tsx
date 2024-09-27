import {useEffect, useRef, useState} from 'react';
import spriteSheetUrl from '../catspritesx4.gif';

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [direction, setDirection] = useState(0); // 0: no movement, -1: left, 1: right

  // Key handlers for direction.
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'ArrowLeft') {
        setDirection(-1);
      } else if (event.key === 'ArrowRight') {
        setDirection(1);
      }
    }

    function handleKeyUp(event: KeyboardEvent) {
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        setDirection(0);
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Draw the animation frames with our sprite!
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

      ctx.fillStyle = '#A475A0';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (direction === 1) {
        // Flip the context horizontally. The sprite is pointing left, but we want it to point right.
        ctx.save();
        ctx.scale(-1, 1);
      }

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
        direction === 1 ? -x - spriteWidth : x,
        y,
        spriteWidth,
        spriteHeight,
      );

      // Restore the context to its original state before we flipped it.
      ctx.restore();

      // Move sprite based on direction
      x += direction * 2;
      if (x > canvas.width) {
        x = -spriteWidth;
      } else if (x < -spriteWidth) {
        x = canvas.width;
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
  }, [direction]);

  return (
    <div className="p-8">
      <canvas
        className="mx-auto h-full max-h-[300px] w-full max-w-[400px]"
        ref={canvasRef}
      />
    </div>
  );
}
