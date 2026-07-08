import { globalStore } from "./stores";

const ErrorPage = () => {
  const {error} = globalStore.getState();
  return (
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div class="bg-white p-4 rounded-lg shadow-lg">
          <h2 class="text-xl font-bold mb-4">오류 발생!</h2>
          <p>{error.message}</p>
        </div>
      </div>
  )
}

export default ErrorPage
