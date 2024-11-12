import { createVNode } from "./createVNode";

export function createElement__v2(vNode) {
  // 이 함수는 createElement의 개선된 버전입니다.
// 1. falsy vNode 처리
// 2. 문자열 또는 숫자 vNode 처리
// 3. 배열 vNode 처리 (DocumentFragment 사용)
// 4. 일반 요소 vNode 처리:
//    - 요소 생성
//    - 속성 설정 (이벤트 함수를 이벤트 위임 방식으로 등록할 수 있도록 개선)
//    - 자식 요소 추가
  if (!vNode) return document.createTextNode('');

  if (typeof vNode === 'string' || typeof vNode === 'number') {
    return document.createTextNode(vNode);
  }

  if (Array.isArray(vNode)) {
    const $fragment = document.createDocumentFragment();
    vNode.forEach((child) => {
      $fragment.appendChild(createElement__v2(child));
    });
    return $fragment;
  }

  if (typeof vNode.type === 'function') {
    return createElement__v2(vNode.type(vNode.props));
  }

  const $el = document.createElement(vNode.type);

  for (const k in vNode.props) {
    const v = vNode.props[k];
    // if (k.startsWith('on')) {
    //   $el.addEventListener(k.slice(2).toLowerCase(), v);
    //   continue;
    // }
    if (k === 'className') {
      $el.className = v;
      continue;
    }
    $el.setAttribute(k, v);
  }

  $el.appendChild(createElement__v2(vNode.children));
  return $el;
}
