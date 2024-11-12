// renderElement.js
import { addEvent, removeEvent, setupEventListeners } from './eventManager';
import { createElement__v2 } from "./createElement__v2.js";

let oldNode = null;
// TODO: processVNode 함수 구현
function processVNode() {
  // vNode를 처리하여 렌더링 가능한 형태로 변환합니다.
  // - null, undefined, boolean 값 처리
  // - 문자열과 숫자를 문자열로 변환
  // - 함수형 컴포넌트 처리 <---- 이게 제일 중요합니다.
  // - 자식 요소들에 대해 재귀적으로 processVNode 호출
}

// 이벤트 위임까지 처리.
// 다트. 10점을 노리 던질때가 일반적인 이벤트 처리.
// 던지고 나서 보니 10점짜리네. 이벤트 위임.

// TODO: updateAttributes 함수 구현
function updateAttributes(container, newProps, oldProps) {
  // DOM 요소의 속성을 업데이트합니다.
  // - 이전 props에서 제거된 속성 처리
  // - 새로운 props의 속성 추가 또는 업데이트
  // - 이벤트 리스너, className, style 등 특별한 경우 처리
  //   <이벤트 리스너 처리>
  //     - TODO: 'on'으로 시작하는 속성을 이벤트 리스너로 처리
  //     - 주의: 직접 addEventListener를 사용하지 않고, eventManager의 addEvent와 removeEvent 함수를 사용하세요.
  //     - 이는 이벤트 위임을 통해 효율적으로 이벤트를 관리하기 위함입니다.
  
  for(const key in oldProps) {  
    if(key in newProps) {
      if(oldProps[key] === newProps[key]) continue;
      container.setAttribute(key === 'className' ? 'class' : key, newProps[key]);
    }
  }
}

// TODO: updateElement 함수 구현
// 인덱스도 받아서 비교해야함
// <div id="test">
//   <span>1</span>
//   <span>2</span>
//   <span>3</span>
// </div>;
// {
//   type: 'div',
//   props: { id: 'test' },
//   children: [
//     { type: 'span', props: {}, children: '1' },
//     { type: 'span', props: {}, children: '2' },
//     { type: 'span', props: {}, children: '3' },
//   ],
// }

//   <span>1</span>
//   <span>2</span>
// {
//   type: 'div',
//   props: { id: 'test' },
//   children: [
//     { type: 'span', props: {}, children: '1' },
//     { type: 'span', props: {}, children: '2' },
//   ],
// }
function updateElement(oldNode, newNode, container, index = 0) {

  // 1. 노드 제거 (newNode가 없고 oldNode가 있는 경우)
  // TODO: oldNode만 존재하는 경우, 해당 노드를 DOM에서 제거
  if(!newNode) {
    // todo 컨테이너의 인덱스에 해당하는 자식 노드를 제거합니다.
    container.removeChild(container.childNodes[index]);
    return;
  }

  // 2. 새 노드 추가 (newNode가 있고 oldNode가 없는 경우)
  // TODO: newNode만 존재하는 경우, 새 노드를 생성하여 DOM에 추가
  if(!oldNode) {
    container.appendChild(createElement__v2(newNode));
    return;
  }

  // 3. 텍스트 노드 업데이트
  // TODO: newNode와 oldNode가 둘 다 문자열 또는 숫자인 경우
  // TODO: 내용이 다르면 텍스트 노드 업데이트
  if(typeof newNode === 'string' || typeof newNode === 'number') {
    if(newNode === oldNode) return;

    container.replaceChild(createElement__v2(newNode), container.childNodes[index]);
    return;
  }

  // 4. 노드 교체 (newNode와 oldNode의 타입이 다른 경우)
  // TODO: 타입이 다른 경우, 이전 노드를 제거하고 새 노드로 교체
  if(newNode.type !== oldNode.type) {
    container.replaceChild(createElement__v2(newNode), container.childNodes[index]);
    return;
  }

  // 5. 같은 타입의 노드 업데이트
  // 5-1. 속성 업데이트
  // TODO: updateAttributes 함수를 호출하여 속성 업데이트
  updateAttributes(container.childNodes[index], newNode.props, oldNode.props);

  // 5-2. 자식 노드 재귀적 업데이트
  // TODO: newNode와 oldNode의 자식 노드들을 비교하며 재귀적으로 updateElement 호출
  // HINT: 최대 자식 수를 기준으로 루프를 돌며 업데이트
  const childLength = Math.max(newNode.children.length, oldNode.children.length);
  for(let i = 0; i < childLength; i++) {
    console.log(container.childNodes[index]);
    updateElement(oldNode.children[i],newNode.children[i], container.childNodes[index], i);
  }

  // 5-3. 불필요한 자식 노드 제거
  // TODO: oldNode의 자식 수가 더 많은 경우, 남은 자식 노드들을 제거
  // if(oldNode.children.length > newNode.children.length) {
  //   for(let i = newNode.children.length; i < oldNode.children.length; i++) {
  //     container.removeChild(container.childNodes[newNode.children.length]);
  //   }
  // }
}

// TODO: renderElement 함수 구현
export function renderElement(vNode, container) {
  // 최상위 수준의 렌더링 함수입니다.
  // - 이전 vNode와 새로운 vNode를 비교하여 업데이트
  // - 최초 렌더링과 업데이트 렌더링 처리

  // 이벤트 위임 설정
  // TODO: 렌더링이 완료된 후 setupEventListeners 함수를 호출하세요.
  // 이는 루트 컨테이너에 이벤트 위임을 설정하여 모든 하위 요소의 이벤트를 효율적으로 관리합니다.
  
  // 새로운 vNode와 비교하여 업데이트

  // 컨테이너가 비어있는 경우 처리.
  // 한번 렌더링이 된 후.
  if(!container.innerHTML) {
    container.appendChild(createElement__v2(vNode));
    oldNode = vNode;
    return;
  }

  updateElement(oldNode, vNode, container);
  oldNode = vNode;
}
