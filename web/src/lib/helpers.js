export function cn(...args) {
  return args.filter(Boolean).join(" ");
}

export function range(n) {
  return Array.from({ length: n }).map((_, i) => i);
}

/**
 * Errors log formatting helpers
 */
export function errorId(method, error) {
  if (error) {
    return `${method}(${error})`;
  } else {
    return method;
  }
}
