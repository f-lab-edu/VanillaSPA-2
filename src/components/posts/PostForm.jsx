/** @jsx createVNode */
import{ createVNode } from "../../lib";
import { globalStore } from "../../stores";
import { Post } from "./Post";

export const PostForm = () => {
  const { posts } = globalStore.getState();
  return (
    <div id="posts-container" class="space-y-4">
      {
        posts.map(
          (post) => (
            <Post key={post.id} post={post} />
          )
        )
      }
    </div>
  );

}
