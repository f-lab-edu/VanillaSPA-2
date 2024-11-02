import { createStore } from "../lib";
import { userStorage } from "../storages";

export const globalStore = createStore({
  currentUser: userStorage.get(),
  loggedIn: Boolean(userStorage.get()),
  posts: [
    { id: 1, author: '홍길동', time: '5분 전', content: '오늘 날씨가 정말 좋네요. 다들 좋은 하루 보내세요!' },
    { id: 2, author: '김철수', time: '15분 전', content: '새로운 프로젝트를 시작했어요. 열심히 코딩 중입니다!' },
    { id: 3, author: '이영희', time: '30분 전', content: '오늘 점심 메뉴 추천 받습니다. 뭐가 좋을까요?' },
    { id: 4, author: '박민수', time: '1시간 전', content: '주말에 등산 가실 분 계신가요? 함께 가요!' },
    { id: 5, author: '정수연', time: '2시간 전', content: '새로 나온 영화 재미있대요. 같이 보러 갈 사람?' }
  ],
  error: null,
})
