import {useEffect, useRef} from 'react';
import spriteSheetUrl from '../catspritesx4.gif';

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;

    // Sprite properties
    const spriteWidth = 64;
    const spriteHeight = 64;

    const spriteImage = new Image();
    spriteImage.src = spriteSheetUrl;

    spriteImage.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.drawImage(
        spriteImage,
        0,
        0,
        spriteWidth,
        spriteHeight,
        0,
        0,
        spriteWidth,
        spriteHeight,
      );
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
