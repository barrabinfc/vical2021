export const cn = (...args) => {
  return args.filter(Boolean).join(" ");
};

export const range = n => {
  return Array.from({ length: n }).map((_, i) => i);
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
 * Read a ISO string
 */
export const fromISOString = str => {
  return Date.parse(str);
};

/** Convert from MilliTimestamp (javascript default) to unix  */
export const toUnixTimestamp = milliTimestamp => milliTimestamp / 1000;
