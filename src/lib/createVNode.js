// TODO: createVNode 함수 구현
// 1. type, props, ...children을 매개변수로 받는 함수를 작성하세요.
// 2. 반환값은 { type, props, children } 형태의 객체여야 합니다.
// 3. children은 평탄화(flat)되어야 하며, falsy 값은 필터링되어야 합니다.
// 4. Infinity를 사용하여 모든 깊이의 배열을 평탄화하세요.
// function flatten(arr) {
//   return arr.reduce((acc, cur) => {
//     if(Array.isArray(cur))
//       return [...acc, ...flatten(cur)];
//     return [...acc, cur];
//   }, []);
// }

/**
 * 성능을 생각할 경우 
 * 1. concat이 가장 빠름
 * 2. spread는 concat보다 느림
 * 3. flat이 가장 느림
 */
const flatten = (arr) => arr.reduce((acc, cur) => acc.concat(Array.isArray(cur)?flatten(cur):cur) , []);

export function createVNode(type, props, ...children) {
  // 여기에 구현하세요
  if(typeof type === 'function') {
    return type(props);
  }
  
  // const $children = [];
  // children.map((child) => {
  //   if(typeof child === 'string' || typeof child === 'number')
  //     $children.push(child);
  //   else if(Array.isArray(child))
  //     $children.push(...flatten(child));
  //   else if(child)
  //     $children.push(child);
  // });
  // return {
  //   type,
  //   props,
  //   children: $children,
  // }
  return {
    type,
    props,
    children: children.flat(Infinity).filter(Boolean),
  }
}
