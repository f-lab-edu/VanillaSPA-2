/** @jsx createVNode */
import { createElement, createRouter, createVNode, renderElement } from "./lib";
import { HomePage, LoginPage, NotFoundPage, ProfilePage } from "./pages";
import { globalStore } from "./stores";
import { ForbiddenError, UnauthorizedError } from "./errors";
import { userStorage } from "./storages";
import { addEvent, registerGlobalEvents } from "./utils";
import { App } from "./App";
import { createElement__v2 } from "./lib/createElement__v2.js";

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
  "/notfound": () => {
    return <NotFoundPage/>;
  },
});

function logout() {
  globalStore.setState({ currentUser: null, loggedIn: false });
  router.push('/login');
  userStorage.reset();
}

function handleError(error) {
  globalStore.setState({ error });
  router.push('/error');
}

// 초기화 함수
function render() {
  const $root = document.querySelector('#root');

  try {
    // 가상돔
    const $app = <App targetPage={router.getTarget()} />;
    // { type:App',props:{'targetPage":router.getTarget()},children:[] }

    // 리얼돔
    // const $app = createElement__v2(<App targetPage={router.getTarget()} />);
    renderElement($app,$root);
    
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

  addEvent('submit', 'form', (e) => {
    e.preventDefault();
    if(e.target.id === 'login-form') {
      const username = e.target.querySelector('input[id="username"]').value;
      const password = e.target.querySelector('input[type="password"]').value;
      const user = { username, email: '', bio: '' };
      userStorage.set(user);
      globalStore.setState({ currentUser: user, loggedIn: true });

      router.push('/');
    }else if (e.target.id === 'profile-form') {
      const username = e.target.querySelector('input[id="username"]').value;
      const email = e.target.querySelector('input[id="email"]').value;
      const bio = e.target.querySelector('textarea[id="bio"]').value;
      const user = { username, email, bio };
      userStorage.set(user);
      globalStore.setState({ currentUser: user });
      alert('프로필이 업데이트되었습니다.');
    }
  });

  render();
}

main();
