/** @jsx createVNode */
import { createElement, createRouter, createVNode, renderElement } from "./lib";
import { HomePage, LoginPage, ProfilePage } from "./pages";
import { globalStore } from "./stores";
import { ForbiddenError, UnauthorizedError } from "./errors";
import { userStorage } from "./storages";
import { addEvent, registerGlobalEvents } from "./utils";
import { App } from "./App";

const router = createRouter({
  "/": HomePage,
  "/login": () => {
    const { loggedIn } = globalStore.getState();
    if (loggedIn) {
      throw new ForbiddenError();
    }
    return <LoginPage/>;
  },
  "/profile": () => {
    const { loggedIn } = globalStore.getState();
    if (!loggedIn) {
      throw new UnauthorizedError();
    }
    return <ProfilePage/>;
  },
});

function logout() {
  globalStore.setState({ currentUser: null, loggedIn: false });
  router.push('/login');
  userStorage.reset();
}

function handleError(error) {
  globalStore.setState({ error });
}

// 초기화 함수
function render() {
  const $root = document.querySelector('#root');

  try {
    const $app = createElement(<App targetPage={router.getTarget()}/>);
    if ($root.hasChildNodes()) {
      $root.firstChild.replaceWith($app)
    } else{
      $root.appendChild($app);
    }
  } catch (error) {
    if (error instanceof ForbiddenError) {
      router.push("/");
      return;
    }
    if (error instanceof UnauthorizedError) {
      router.push("/login");
      return;
    }

    console.error(error);

    // globalStore.setState({ error });
  }
  registerGlobalEvents();
}

function main() {
  router.subscribe(render);
  globalStore.subscribe(render);
  window.addEventListener('error', handleError);
  window.addEventListener('unhandledrejection', handleError);

  addEvent('click', '[data-link]', (e) => {
    e.preventDefault();
    router.push(e.target.href.replace(window.location.origin, ''));
  });

  addEvent('click', '#logout', (e) => {
    e.preventDefault();
    logout();
  });

  addEvent('click', '#error-boundary', (e) => {
    e.preventDefault();
    globalStore.setState({ error: null });
  });

  render();
}

main();
