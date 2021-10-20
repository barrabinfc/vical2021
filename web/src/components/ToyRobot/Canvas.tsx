import React, { MutableRefObject, useCallback, useEffect, useRef } from 'react';

import { cn } from '../../lib/helpers';

import useCanvas from '../../hooks/useCanvas';
// import { useKeyPressedCallback } from '../../../hooks/useKeyPressed';

import style from './playground.module.scss';

import BmoImage from './bmo.png';
import { ToyRobot, Vec2 } from './ToyRobot';

interface RobotCanvasCoordinateSystem {
  width: number;
  height: number;
  /** A unit in robot coordinate system to canvas size */
  unitX: number;
  unitY: number;
}

interface ToyRobotCanvasProps {
  className?: string;
  robot: ToyRobot;
  dimensions: Vec2;
  debug?: boolean;
}

export const ToyRobotCanvas = (props: ToyRobotCanvasProps) => {
  const dimensions: [number, number] = props.dimensions;
  const coordSystem: MutableRefObject<RobotCanvasCoordinateSystem> = useRef({} as RobotCanvasCoordinateSystem);

  const robotImageEl = useRef(null);
  const robotImageSize = [64, 64];
  const guidesEnabled = props.debug === true || false;

  const robot = props.robot;

  const drawGuides = (ctx) => {
    const { width, height, unitX, unitY } = coordSystem.current;
    ctx.strokeStyle = '#6dcff6';
    for (let x = 0; x < dimensions[0] + 1; x++) {
      ctx.beginPath();
      ctx.moveTo(x * unitX, 0);
      ctx.lineTo(x * unitX, height);
      ctx.stroke();
    }
    for (let y = 0; y < dimensions[1] + 1; y++) {
      ctx.beginPath();
      ctx.moveTo(0, y * unitY);
      ctx.lineTo(width, y * unitY);
      ctx.stroke();
    }
  };

  const drawRobot = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      const { width, height, unitX, unitY } = coordSystem.current;

      ctx.save();
      // Invert Y Axis (0,0 should be bottom-left)
      ctx.setTransform(1, 0, 0, -1, 0, height);
      ctx.translate(robot.position[0] * unitX + unitX / 2, robot.position[1] * unitY + unitY / 2);
      ctx.rotate(robot.angleInRadians);
      ctx.drawImage(
        robotImageEl.current,
        -robotImageSize[0] / 2,
        -robotImageSize[1] / 2,
        robotImageSize[0],
        robotImageSize[1]
      );
      ctx.restore();
    },
    [...props.dimensions]
  );

  /**
   * Setup events
   */
  // const onKeyArrowEvent = useCallback((ev) => {
  //   if (ev.key === 'ArrowLeft') {
  //     robot.left();
  //   } else if (ev.key === 'ArrowRight') {
  //     robot.right();
  //   } else if (ev.key === 'ArrowUp') {
  //     robot.move();
  //   }
  // }, []);
  // useKeyPressedCallback((ev) => {
  //   const isKey = ev.key == 'ArrowLeft' || ev.key === 'ArrowRight' || ev.key === 'ArrowUp';
  //   return isKey;
  // }, onKeyArrowEvent);

  /**
   * Render loop
   */
  let raf = null;
  const renderLoop = useCallback(
    (ctx) => {
      const { width, height, unitX, unitY } = coordSystem.current;

      ctx.clearRect(0, 0, width, height);

      if (guidesEnabled) {
        drawGuides(ctx);
      }

      drawRobot(ctx);
      raf = requestAnimationFrame(() => renderLoop(ctx));
    },
    [guidesEnabled]
  );

  /**
   * Setup canvas
   */
  const setupCanvas = (ctx) => {
    let parentWrapper = canvasRef.current.parentNode;
    let parentRect = parentWrapper.getBoundingClientRect();

    canvasRef.current.width = parentRect.width;
    canvasRef.current.height = parentRect.height;
    coordSystem.current = {
      width: parentRect.width,
      height: parentRect.height,
      unitX: parentRect.width / dimensions[0],
      unitY: parentRect.height / dimensions[1]
    };

    raf = requestAnimationFrame(() => renderLoop(ctx));
    return () => {
      cancelAnimationFrame(raf);
    };
  };

  const canvasRef = useCanvas(setupCanvas);

  return (
    <div className={cn(style.toyrobotCanvasWrapper, props.className)}>
      <canvas ref={canvasRef} />
      <img ref={robotImageEl} src={BmoImage} className={cn(style.bmoImage)} />
    </div>
  );
};

export default ToyRobotCanvas;
