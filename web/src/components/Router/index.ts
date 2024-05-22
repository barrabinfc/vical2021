import Router from './Router';

if (!window.router) {
  const myRouter = new Router();
  window.router = myRouter;
}
