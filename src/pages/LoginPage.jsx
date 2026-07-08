/** @jsx createVNode */
import{ createVNode } from "../lib";

export const LoginPage = () => {  
  return (
    <div class="bg-gray-100 flex items-center justify-center min-h-screen">
      <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 class="text-2xl font-bold text-center text-blue-600 mb-8">항해플러스</h1>
        <form id="login-form">
          <input type="text" id="username" placeholder="사용자 이름" class="w-full p-2 mb-4 border rounded" required/>
          <input type="password" id="password" placeholder="비밀번호" class="w-full p-2 mb-6 border rounded" required/>
          <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded">로그인</button>
        </form>
        <div class="mt-4 text-center">
          <a href="#" class="text-blue-600 text-sm">비밀번호를 잊으셨나요?</a>
        </div>
        <hr class="my-6"/>
        <div class="text-center">
          <button class="bg-green-500 text-white px-4 py-2 rounded">새 계정 만들기</button>
        </div>
      </div>
    </div>
  )
};
