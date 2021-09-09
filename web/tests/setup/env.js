import { JSDOM } from "jsdom";
import React from "react";
import { render as reactRender, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

const { window } = new JSDOM("<main></main>");

export function setup() {
  // @ts-ignore
  global.window = window;
  global.document = window.document;
  global.navigator = window.navigator;
  global.getComputedStyle = window.getComputedStyle;
  global.requestAnimationFrame = null;
}

export function reset() {
  window.document.title = "";
  window.document.head.innerHTML = "";
  window.document.body.innerHTML = "<main></main>";
}

/**
 * @typedef RenderOutput
 * @property container {HTMLElement}
 * @property component {React.ReactElement}
 */

/**
 * @return {RenderOutput}
 */
export function render(component, props = {}) {
  const container = window.document.querySelector("main");
  reactRender(component, container);
  return { container, component };
}

/**
 * @param {HTMLElement} elem
 * @param {String} event
 * @param {any} [details]
 */
export async function fire(elem, event, details) {
  await act(() => {
    let evt = new window.Event(event, details);
    elem.dispatchEvent(evt);
  });
}
