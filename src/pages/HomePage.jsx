/** @jsx createVNode */
import { Footer, Header, Navigation, Post, PostForm } from "../components";
import{ createVNode } from "../lib";

export const HomePage = () =>(
  <div class="bg-gray-100 min-h-screen flex justify-center">
    <div class="max-w-md w-full">
      <Header />
      <Navigation/>
      <main class="p-4">
        <PostForm/>
      </main>
      <Footer />
    </div>
  </div>
);
