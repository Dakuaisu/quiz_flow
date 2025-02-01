"use client";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  const handleListOfQuizzes = () => {
    router.push("/ListofQuizes"); 
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white font-poppins text-center">
      <h1 className="text-5xl font-bold mb-4">Welcome to Quiz Flow</h1>
      <p className="text-xl mb-8">
        Test your knowledge and challenge yourself with our interactive quizzes!
      </p>
      <button
        onClick={handleListOfQuizzes}
        className="px-8 py-3 text-lg font-semibold text-blue-600 bg-white rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200"
      >
        List of Quizzes
      </button>
    </div>
  );
}