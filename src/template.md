컴포넌트 구현을 위해 참고해야 하는 코드입니다. 여기있는 코드를 직접적으료 사용하진 않도록 해주세요
여기있는 코드를 이용해서 jsx 코드를 만들어주세요

```javascript
const Post = ({ author, time, content, id }) => `
  <div class="bg-white rounded-lg shadow p-4 mb-4">
    <div class="flex items-center mb-2">
      <img src="https://via.placeholder.com/40" alt="프로필" class="rounded-full mr-2">
      <div>
        <div class="font-bold">${author}</div>
        <div class="text-gray-500 text-sm">${time}</div>
      </div>
    </div>
    <p>${content}</p>
    <div class="mt-2 flex justify-between text-gray-500">
      <span class="like-button" data-post-id="${id}">좋아요</span>
      <span>댓글</span>
      <span>공유</span>
    </div>
  </div>
`;
```

```javascript
const PostForm = () => `
  <div class="mb-4 bg-white rounded-lg shadow p-4">
    <textarea id="post-content" placeholder="무슨 생각을 하고 계신가요?" class="w-full p-2 border rounded"></textarea>
    <button id="post-submit" class="mt-2 bg-blue-600 text-white px-4 py-2 rounded">게시</button>
  </div>
`;
```

```javascript
const Footer = () => `
  <footer class="bg-gray-200 p-4 text-center">
    <p>&copy; 2024 항해플러스. All rights reserved.</p>
  </footer>
`;
```

```javascript
const getNavItemClass = (path) => {
  const currentPath = window.location.pathname;
  return currentPath === path ? 'text-blue-600 font-bold' : 'text-gray-600';
}

const Navigation = ({ loggedIn }) => `
  <nav class="bg-white shadow-md p-2 sticky top-14">
    <ul class="flex justify-around">
      <li><a href="/" class="${getNavItemClass('/')}" data-link>홈</a></li>
      ${!loggedIn ? `<li><a href="/login" class="${getNavItemClass('/login')}" data-link>로그인</a></li>` : ''}
      ${loggedIn ? `<li><a href="/profile" class="${getNavItemClass('/profile')}" data-link>프로필</a></li>` : ''}
      ${loggedIn ? `<li><a href="#" id="logout" class="text-gray-600">로그아웃</a></li>` : ''}
    </ul>
  </nav>
`;
```

```javascript
const Header = () => `
  <header class="bg-blue-600 text-white p-4 sticky top-0">
    <h1 class="text-2xl font-bold">항해플러스</h1>
  </header>
`;
```

```javascript
const HomePage = () => {
  const { loggedIn, posts } = globalStore.getState();
  return `
    <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
        ${Header()}
        ${Navigation({ loggedIn })}
        
        <main class="p-4">
          ${loggedIn ? PostForm() : ''}
          <div id="posts-container" class="space-y-4">
            ${posts.map(Post).join('')}
          </div>
        </main>
        
        ${Footer()}
      </div>
    </div>
  `;
}
```

```javascript
const LoginPage = () => `
  <div class="bg-gray-100 flex items-center justify-center min-h-screen">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 class="text-2xl font-bold text-center text-blue-600 mb-8">항해플러스</h1>
      <form id="login-form">
        <input type="text" id="username" placeholder="사용자 이름" class="w-full p-2 mb-4 border rounded" required>
        <input type="password" placeholder="비밀번호" class="w-full p-2 mb-6 border rounded" required>
        <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded">로그인</button>
      </form>
      <div class="mt-4 text-center">
        <a href="#" class="text-blue-600 text-sm">비밀번호를 잊으셨나요?</a>
      </div>
      <hr class="my-6">
      <div class="text-center">
        <button class="bg-green-500 text-white px-4 py-2 rounded">새 계정 만들기</button>
      </div>
    </div>
  </div>
`;
```

```javascript
const NotFoundPage = () => `
  <main class="bg-gray-100 flex items-center justify-center min-h-screen">
    <div class="bg-white p-8 rounded-lg shadow-md w-full text-center" style="max-width: 480px">
      <h1 class="text-2xl font-bold text-blue-600 mb-4">항해플러스</h1>
        <p class="text-4xl font-bold text-gray-800 mb-4">404</p>
        <p class="text-xl text-gray-600 mb-8">페이지를 찾을 수 없습니다</p>
        <p class="text-gray-600 mb-8">요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.</p>
      <a href="/" data-link class="bg-blue-600 text-white px-4 py-2 rounded font-bold">홈으로 돌아가기</a>
    </div>
  </main>
`;

```

```javascript
const ProfilePage = () => {
  const { loggedIn, currentUser } = globalStore.getState();
  const { username = '', email = '', bio = '' } = currentUser ?? {}
  return `
    <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
        ${Header()}
        ${Navigation({ loggedIn })}
        <main class="p-4">
          <div class="bg-white p-8 rounded-lg shadow-md">
            <h2 class="text-2xl font-bold text-center text-blue-600 mb-8">내 프로필</h2>
            <form id="profile-form">
              <div class="mb-4">
                <label for="username" class="block text-gray-700 text-sm font-bold mb-2">사용자 이름</label>
                <input type="text" id="username" name="username" class="w-full p-2 border rounded" value="${username}" required>
              </div>
              <div class="mb-4">
                <label for="email" class="block text-gray-700 text-sm font-bold mb-2">이메일</label>
                <input type="email" id="email" name="email" class="w-full p-2 border rounded" value="${email}" required>
              </div>
              <div class="mb-6">
                <label for="bio" class="block text-gray-700 text-sm font-bold mb-2">자기소개</label>
                <textarea id="bio" name="bio" rows="4" class="w-full p-2 border rounded">${bio}</textarea>
              </div>
              <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded font-bold">프로필 업데이트</button>
            </form>
          </div>
        </main>
        ${Footer()}
      </div>
    </div>
  `;
}
```

```javascript
function App({ targetPage }) {
  const PageComponent = targetPage ?? NotFoundPage;
  const error = globalStore.getState().error;
  
  return `
    <div>
      ${PageComponent()}
      ${error ? `
        <div id="error-boundary" class="fixed bottom-4 left-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-lg transition-opacity duration-300 hover:opacity-75" role="alert">
          <div class="flex justify-between items-center">
            <div>
              <strong class="font-bold">오류 발생!</strong>
              <span class="block sm:inline ml-1">${error.message || '알 수 없는 오류가 발생했습니다.'}</span>
            </div>
            <button class="text-red-700 hover:text-red-900 font-semibold">
              &times;
            </button>
          </div>
        </div>
      `  : ''}
    </div>
  `;
}
