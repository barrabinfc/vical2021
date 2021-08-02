export default class Router {
  navigate(to: string, state: Record<string, unknown>): void {
    history.pushState(state, "", to);
  }
}
