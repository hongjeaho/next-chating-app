import AuthForm from "./components/AuthForm";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center min-h-full py-12 bg-gray-100 sm:px-6 lgLpx-8">
      <div className="sm:mx-aut sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-3xl font-bold tracking-tighter text-center text-gray-900">
          로그인 & 회원가입
        </h2>
        <AuthForm />
      </div>
    </div>
  );
}
