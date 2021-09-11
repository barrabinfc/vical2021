import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import { useControls, folder, Leva } from "leva"
import { interpolate } from "popmotion"

import {cn} from '~/lib/helpers';
import styles from './Flashlight.module.scss';

export function FlashlightStaticDOM(){
  return <div id="flashlight-container">
    <div className={cn(styles['flashlight-pointer'])}></div>
  </div>
}

// type LevaVector2D = VectorObj | {
//   value: VectorObj,
//   onChange: () => void
// };
// type boundsTL = `boundsTL${number}`;
// type boundsBR = `boundsBR${number}`;

// interface FlashlightDebug extends Schema {
//   // penumbraSpread: number,
//   mouse: LevaVector2D,
//   [bounds: boundsTL|boundsBR]: LevaVector2D,
//   [delta: `delta${number}`]: LevaVector2D,
//   [distance: `distance${number}`]: number,
//   [angle: `angle${number}`]: number,
// }

export default function Flashlight() {

  let rootDocument:HTMLElement;
  try {
    rootDocument = document.documentElement;
  } catch {
    // static rendering guard-rail
    return FlashlightStaticDOM();
  }

  // let retainedElements: HTMLElement[];
  let windowW: number, windowH: number;

  // 0. Get viewport size
  windowW = window.innerWidth;
  windowH = window.innerHeight;

  // 1. Gather all elements that can cast a shadow
  const retainedElements = Array.from( document.querySelectorAll<HTMLElement>('.cast-shadow') );
  const refElements = useRef([]);

  const [tweak, setTweak] = useControls(() => ({
    'Tweaks': folder({
      ['penumbraSpread']: {value: 100, min: 50, max: 500, step: 1},
    })
  }));
  console.log(tweak)

  // Create a debug parameter for each retainedElement
  // const debugParameters = retainedElements.map((el, i) => ({
  //     [`mouse`]: {value: {x: 0, y: 0 }, onChange: () => {}},
  //     [`boundsTL${i}`]: {value: {x: 0, y: 0 }, onChange: () => {}},
  //     [`boundsBR${i}`]: {value: {x: 0, y: 0 }, onChange: () => {}},
  //     [`distance${i}`]: {value: 0, onChange: () => {}},
  //     [`angle${i}`]: {value: 0, onChange: () => {}},
  //     [`delta${i}`]: {value: {x: 0, y: 0}, onChange: () => {}}
  //   // Aggregate the array into a single object
  //   })).reduce( (acc, elDebugParameters ) => ({...acc, ...elDebugParameters}), {} );

  // const [debugValues, setDebugValues] = useControls(() => ({
  //   'Debug': folder({
  //     [`mouse`]: {value: {x: 0, y: 0 }, onChange: () => {}},
  //     ...debugParameters
  //   })
  // }))
    // return {
    //   'Tweaks': folder({
    //     ['penumbraSpread']: {value: 100, min: 1, max: 200, step: 1},
    //   }),
    //   'Debug': folder(retainedElements.map((el, i) => ({
    //     [`mouse`]: {value: {x: 0, y: 0 }, onChange: () => {}},
    //     [`boundsTL${i}`]: {value: {x: 0, y: 0 }, onChange: () => {}},
    //     [`boundsBR${i}`]: {value: {x: 0, y: 0 }, onChange: () => {}},
    //     [`distance${i}`]: {value: 0, onChange: () => {}},
    //     [`angle${i}`]: {value: 0, onChange: () => {}},
    //     [`delta${i}`]: {value: {x: 0, y: 0}, onChange: () => {}}
    //   })).reduce( (acc, elInput ,i) => ({
    //     ...acc,
    //     ...elInput,
    //   })))
    // }
  // })

  console.debug('Flashlight:render');

  useEffect(() => {
    /**
     * Fill refs with retainedElements
     */
    refElements.current = retainedElements;

    document.addEventListener('mousemove', onMouseMove, {passive: true});
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
    }
  });

  const onMouseMove = (evt) => {
    let mouseX = evt.clientX;
    let mouseY = evt.clientY;

    // setDebugValues({
    //   /* @ts-ignore */
    //   [`mouse`]: {x: mouseX, y: mouseY},
    // })

    // Update lightsource to mouse position
    // rootDocument.style.setProperty('--mouseX', String(mouseX));
    // rootDocument.style.setProperty('--mouseY', String(mouseY));

    const elementsBounds = refElements.current.map( (el) => {
      const rect = el.getBoundingClientRect();
      const bounds = {
        // el: el,
        // Position in absolute coordinates
        left: rect.left, // + window.scrollX,
        top: rect.top, // + window.scrollY,
        right: rect.right, // + window.scrollX,
        bottom: rect.bottom, // + window.scrollY,
        width: rect.width,
        height: rect.height
      }
      return bounds;
    // }).map((rect, i) => {
    //   setDebugValues({
    //     [`boundsTL${i}`]: {x: rect.left, y: rect.top},
    //     [`boundsBR${i}`]: {x: rect.right, y: rect.bottom},
    //   })
    //   // el.setAttribute('data-debug', JSON.stringify(rect));
    //   return rect;
    // Filter elements out of viewport
    }).filter( (elBound) => (
      elBound.right >= 0 &&
      elBound.left <=  windowW &&
      elBound.bottom >= 0 &&
      elBound.top <= windowH
    ));


    elementsBounds.forEach( (elBound, i) => {

      // Cast a ray from lightSource to each element
      let [centerX,centerY] = [elBound.left + elBound.width * 0.5, elBound.top + elBound.height * 0.5];
      const [angle, distance] = [Math.atan2(centerY - mouseY, mouseX - centerX ),
                                 Math.sqrt(Math.pow(mouseX - centerX,2) + Math.pow(centerY - mouseY,2))];

      // setDebugValues({
      //   [`delta${i}`]: {x: mouseX - centerX, y: centerY - mouseY},
      //   [`distance${i}`]: distance,
      //   [`angle${i}`]: angle * (180/Math.PI),
      // });

      /** @ts-ignore */
      // Apply shadow to element, in opposite direction
      const distanceInterp = interpolate([-windowW, 0, windowW], [tweak.penumbraSpread*-1, 0, tweak.penumbraSpread]);
      const [shadowOffsetX, shadowOffsetY] = [distanceInterp(-Math.cos(angle)*distance), distanceInterp(Math.sin(angle) * distance)];

      const theDomRef = refElements.current[i];
      theDomRef.style.setProperty('box-shadow',
        `${shadowOffsetX*0.05}px ${shadowOffsetY*0.05}px 2px hsl(var(--surface-shadow) / calc(var(--shadow-strength))), `+
        `${shadowOffsetX*0.12}px ${shadowOffsetY*0.12}px 5px hsl(var(--surface-shadow) / calc(var(--shadow-strength))), ` +
        `${shadowOffsetX*0.22}px ${shadowOffsetY*0.22}px 10px hsl(var(--surface-shadow) / calc(var(--shadow-strength) + 0.02)), ` +
        `${shadowOffsetX*0.55}px ${shadowOffsetY*0.55}px 18px hsl(var(--surface-shadow) / calc(var(--shadow-strength) + 0.02)), ` +
        `${shadowOffsetX*0.81}px ${shadowOffsetY*0.81}px 33px hsl(var(--surface-shadow) / calc(var(--shadow-strength) + 0.03)), ` +
        `${shadowOffsetX}px ${shadowOffsetY}px 100px 0px hsl(var(--surface-shadow) / calc(var(--shadow-strength)))`
        // 0 100px 80px hsl(var(--surface-shadow) / var(--shadow-strength));
      );
    })
  };

  return FlashlightStaticDOM();
}
