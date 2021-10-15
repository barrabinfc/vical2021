import { useRef, useEffect } from 'react';

export const useCanvas = (cb: (canvas: CanvasRenderingContext2D, ctx: HTMLCanvasElement) => void) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement;

    let ctx = null;
    ctx = canvas.getContext('2d');
    // OffscreenCanvas: Not yet ready
    // if (canvas.transferControlToOffscreen) {
    //   let offscreen = new OffscreenCanvas();
    //   let ctx = offscreen.getContext('2d');
    // } else {
    // }
    return cb(ctx, canvas);
  });

  return canvasRef;
};
export default useCanvas;
