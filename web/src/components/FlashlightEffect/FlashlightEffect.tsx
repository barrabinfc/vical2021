import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import { useControls, folder, Leva } from "leva"
import { interpolate } from "popmotion"

import {cn} from '~/lib/helpers';
import {useSharedSettings} from '../../hooks/useSharedSettings';

import styles from './FlashlightEffect.module.scss';

export function FlashlightStaticDOM(){
  return <div id="flashlight-container">
    <div className={cn(styles['flashlight-pointer'])}></div>
  </div>
}

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

  /** Tweak parameters */
  const {tweaksEnabled, setTweaksEnabled} = useSharedSettings();
  let [penumbraDistance, setPenumbraDistance] = useState(100);
  let [penumbraSpread, setPenumbraSpread] = useState(100);

  useControls(() => ({
    'Penumbra': folder({
      ['distance']: {value: 100, min: 50, max: 500, step: 1, onChange: (v) => setPenumbraDistance(v)},
      ['spread']: {value: 100, min: 50, max: 500, step: 1, onChange: (v) => setPenumbraSpread(v)},
    })
  }));

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

    // Gather the bounds of elements that can cast a shadow
    const elementsBounds = refElements.current.map( (el) => {
      const rect = el.getBoundingClientRect();
      const bounds = {
        // Position in absolute coordinates
        left: rect.left, // + window.scrollX,
        top: rect.top, // + window.scrollY,
        right: rect.right, // + window.scrollX,
        bottom: rect.bottom, // + window.scrollY,
        width: rect.width,
        height: rect.height
      }
      return bounds;
    // Exclude elements not in viewport
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

      /** @ts-ignore */
      // Apply shadow to element, in opposite direction
      const distanceInterp = interpolate([-windowW, 0, windowW], [penumbraDistance*-1, 0, penumbraDistance]);
      const [shadowOffsetX, shadowOffsetY] = [distanceInterp(-Math.cos(angle)*distance), distanceInterp(Math.sin(angle) * distance)];

      const theDomRef = refElements.current[i];
      theDomRef.style.setProperty('box-shadow',
        `${shadowOffsetX*0.05}px ${shadowOffsetY*0.05}px ${penumbraSpread*0.02}px hsl(var(--surface-shadow) / calc(var(--shadow-strength))), `+
        `${shadowOffsetX*0.12}px ${shadowOffsetY*0.12}px ${penumbraSpread*0.05}px hsl(var(--surface-shadow) / calc(var(--shadow-strength))), ` +
        `${shadowOffsetX*0.22}px ${shadowOffsetY*0.22}px ${penumbraSpread*0.1}px hsl(var(--surface-shadow) / calc(var(--shadow-strength) + 0.02)), ` +
        `${shadowOffsetX*0.55}px ${shadowOffsetY*0.55}px ${penumbraSpread*0.2}px hsl(var(--surface-shadow) / calc(var(--shadow-strength) + 0.02)), ` +
        `${shadowOffsetX*0.81}px ${shadowOffsetY*0.81}px ${penumbraSpread*0.33}px hsl(var(--surface-shadow) / calc(var(--shadow-strength) + 0.03)), ` +
        `${shadowOffsetX}px ${shadowOffsetY}px ${penumbraSpread}px 0px hsl(var(--surface-shadow) / calc(var(--shadow-strength)))`
        // 0 100px 80px hsl(var(--surface-shadow) / var(--shadow-strength));
      );
    })
  };

  return FlashlightStaticDOM();
}
