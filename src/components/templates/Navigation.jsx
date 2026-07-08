/** @jsx createVNode */
import{ createVNode } from "../../lib";
import { globalStore } from "../../stores";

export const Navigation = () => {
  const {loggedIn} = globalStore.getState();

  const checkPath = (name)=>{
    const path = window.location.pathname;
    return path === name ? 'text-blue-600 font-bold' : 'text-gray-600';
  }
  return (
    <nav class="bg-white shadow-md p-2 sticky top-14">
      <ul class="flex justify-around">
        <li>
          <a href="/" class={checkPath('/')} data-link="true">
            홈
          </a>
        </li>
        {loggedIn ? (
          [
            (
              <li>
                <a href="/profile" class={checkPath('/profile')} data-link="true">
                  프로필
                </a>
              </li>
            ),(
              <li>
                <button id="logout" class="text-gray-600">
                  로그아웃
                </button>
              </li>
            )
          ]
        ) : (
          <li>
            <a href="/login" class="text-gray-600" data-link="true">
              로그인
            </a>
          </li>
        )}
      </ul>
    </nav>
  );  
}