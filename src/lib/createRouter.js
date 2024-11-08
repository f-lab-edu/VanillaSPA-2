import { createObserver } from "./createObserver";

export const createRouter = (routes) => {
  const { subscribe, notify } = createObserver();

  const getTarget = () => {
    if (!routes[window.location.pathname]) {
      return routes["/notfound"];
    }
    return routes[window.location.pathname]
  }

  const push = (path) => {
    window.history.pushState(null, null, path);
    notify();
  }

  window.addEventListener('popstate', () => notify());

  return { push, subscribe, getTarget }
};
