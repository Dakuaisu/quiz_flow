"use client";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const score = parseInt(searchParams.get("score"), 10);
  const { quizId } = useParams();
  const router = useRouter();
  
  const handleViewCorrectAnswers = () => {
    router.push(`/quiz/${quizId}/correct-answers`);
  };

  return (
    <div className="flex items-center justify-start min-h-screen  font-poppins p-12">
      {/* Left Side - Text */}
      <div className="w-[40%] flex flex-col justify-center">
        {score > 20 ? (
          <>
            <h1 className="text-6xl font-bold mb-4 transform rotate-[-5deg]">
              Congratulations!
            </h1>
            <p className="text-2xl mb-8 transform rotate-[3deg]">
              You scored <span className="font-bold text-yellow-300">{score}</span> points!
            </p>
            <p className="text-xl mb-8">
              🎉 You're a quiz master! Keep up the great work! 🎉
            </p>
          </>
        ) : (
          <>
            <h1 className="text-4xl font-bold mb-4">Quiz Results</h1>
            <p className="text-2xl mb-8">
              Your score: <span className="font-bold text-yellow-600">{score}</span>
            </p>
            <p className="text-xl mb-8">
              Good effort! Keep practicing to improve your score. 💪
            </p>
          </>
        )}

        {/* Buttons */}
        <div className="space-y-4 flex flex-col items-center">
  <div className="w-full flex justify-between">
    <button
      onClick={handleViewCorrectAnswers}
      className="py-2 px-4 bg-gradient-to-br from-[#158e8c] to-[#2b275d] text-white w-80 rounded-full font-semibold hover:bg-teal-900 transition duration-300"
    >
      View Correct Answers
    </button>
    <button
      onClick={() => router.push("/ListofQuizes")}
      className="py-2 px-4 bg-gradient-to-br from-[#158e8c] to-[#2b275d] text-white w-80 rounded-full font-semibold hover:bg-teal-900 transition duration-300"
    >
      Try Another Quiz
    </button>
  </div>
  <button
    onClick={() => router.push("/")}
    className="py-2 px-4 bg-gradient-to-br from-[#158e8c] to-[#2b275d] text-white w-full rounded-full font-semibold hover:bg-teal-900 transition duration-300"
  >
    Go Home
  </button>
</div>

      </div>
      
      {/* Right Side - GIF */}
      <div className="w-[48%] flex ml-[10%] justify-center">
        <Image 
          src="/IMG_6738.gif" // Replace with your actual GIF path
          alt="Quiz Celebration GIF"
          width={500} 
          height={500} 
          className="rounded-lg "
        />
      </div>
    </div>
  );
}
