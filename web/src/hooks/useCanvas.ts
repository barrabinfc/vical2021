import { useRef, useEffect } from 'react';

export const useCanvas = (cb: (canvas: CanvasRenderingContext2D, ctx: HTMLCanvasElement) => void) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    return cb(ctx, canvas);
  });

  return canvasRef;
};
export default useCanvas;
