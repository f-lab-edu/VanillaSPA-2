/** @jsx createVNode */
import{ createVNode } from "../../lib";

export const Post = ({post}) => {
  const {id,author,time,content} = post;
  return (
  
  <div class="bg-white rounded-lg shadow p-4 mb-4">
    <div class="flex items-center mb-2">
      <img
        src="https://via.placeholder.com/40"
        alt="프로필"
        class="rounded-full mr-2"
      />
      <div>
        <div class="font-bold">{author}</div>
        <div class="text-gray-500 text-sm">{time}</div>
      </div>
    </div>
    <p>{content}</p>
    <div class="mt-2 flex justify-between text-gray-500">
      <span class="like-button" data-post-id={id}>
        좋아요
      </span>
      <span>댓글</span>
      <span>공유</span>
    </div>
  </div>
)
};
