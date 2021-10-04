import React from 'react';

export const cn = (...args) => {
  return args.filter(Boolean).join(' ');
};

export const range = (n) => {
  return Array.from({ length: n }).map((_, i) => i);
};

/**
 * Get value of CSS variable `--variable`
 */
export const getCSSPropertyValue = (variable: string) => {
  return getComputedStyle(document.documentElement).getPropertyValue(variable);
};

/**
 * Errors log formatting helpers
 */
export const errorId = (method, error) => {
  if (error) {
    return `${method}(${error})`;
  } else {
    return method;
  }
};

/**
 *  Check if there's a children passed
 *  (because astro will always fill children, but with props.value = '')
 */
export const hasReactChildren = (child: React.ReactElement): boolean => {
  return (
    child &&
    child['$$typeof'] &&
    child['$$typeof'] === Symbol.for('react.element') &&
    child.props &&
    child.props.value &&
    child.props.value !== ''
  );
};

/**
 * Read a ISO string
 */
export const fromISOString = (str) => {
  return Date.parse(str);
};

/** Convert from MilliTimestamp (javascript default) to unix  */
export const toUnixTimestamp = (milliTimestamp: number): UnixTimestamp => {
  return (milliTimestamp / 1000) as UnixTimestamp;
};

/* From Unix timestamp to DMY(internatially popular) string date   */
export function toDMYDateString(date: UnixTimestamp): string;
export function toDMYDateString(date: Date): string;
export function toDMYDateString(date: UnixTimestamp | Date): string {
  switch (typeof date) {
    case 'number':
      return new Date(date * 1000).toLocaleDateString('pt-BR');
    case 'object':
      return date.toLocaleDateString('pt-BR');
  }
}

/* From Unix timestamp to readable string date   */
export function toReadableDateString(date: UnixTimestamp): string;
export function toReadableDateString(date: Date): string;
export function toReadableDateString(date: UnixTimestamp | Date): string {
  const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  switch (typeof date) {
    case 'number':
      return new Date(date * 1000).toLocaleDateString('en-US', options);
    case 'object':
      return date.toLocaleDateString('en-US', options);
  }
}

/**
 * Slugify
 * Transform `txt` into a url friendly slug.
 * Capitalize each word, join it together, and strip non 09AZ-_ chars
 */
export const slugifyRaw = (splitTransform: [string, string] = [' ', ''], txt: string = ''): string => {
  return txt
    .trim()
    .split(splitTransform[0])
    .map((token) => token.slice(0, 1).toUpperCase() + token.slice(1).toLowerCase())
    .join(splitTransform[1])
    .replace(/[^0-9a-z_-]/gi, '');
};

export const slugify: (txt: string) => string = slugifyRaw.bind(null, null);
export const slugifyFilepath: (txt: string) => string = slugifyRaw.bind(null, ['/', '-']);

/** Emojify status */
export const emojifyStatus = (status: 'draft' | 'in progress' | 'complete'): string => {
  switch (status) {
    case 'draft':
      return '🌱';
    case 'in progress':
      return '🌿';
    case 'complete':
      return '🌳';
    default:
      return '❌';
  }
};

/**
 * Avoid widowed words at the end.
 */
export const avoidWidowedWords = (text: string, widows: number = 3): string => {
  const words = text.split(' ');
  const [first, last] = [words.slice(0, -widows), words.slice(-widows)];
  return first.join(' ') + ' ' + last.join('\u00A0');
};
