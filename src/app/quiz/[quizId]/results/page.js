"use client";
import { useParams,useSearchParams, useRouter } from "next/navigation";

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const score = parseInt(searchParams.get("score"), 10);
  const { quizId } = useParams();
  const router = useRouter();
  const handleViewCorrectAnswers = () => {
    router.push(`/quiz/${quizId}/correct-answers`); // Redirect to correct answers page
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center 0 text-white font-poppins text-center p-6">
      {score > 20 ? (
        <>
          {/* Graffiti and Congratulations Message */}
          <div className="relative">
            <h1 className="text-6xl font-bold mb-4 transform rotate-[-5deg]">
              Congratulations!
            </h1>
            <p className="text-2xl mb-8 transform rotate-[3deg]">
              You scored <span className="font-bold text-yellow-300">{score}</span> points!
            </p>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-pink-500 to-yellow-500 opacity-20 rounded-full blur-2xl"></div>
          </div>
          <p className="text-xl mb-8">
            🎉 You're a quiz master! Keep up the great work! 🎉
          </p>
        </>
      ) : (
        <>
          {/* Regular Results Message */}
          <h1 className="text-4xl font-bold mb-4">Quiz Results</h1>
          <p className="text-2xl mb-8">
            Your score: <span className="font-bold text-yellow-300">{score}</span>
          </p>
          <p className="text-xl mb-8">
            Good effort! Keep practicing to improve your score. 💪
          </p>
        </>
      )}

      {/* Buttons */}
      <div className="space-x-4">
        <button
          onClick={() => router.push("/ListofQuizes")}
          className="mt-6 py-2 px-4 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-900 transition duration-300"
        >
          Try Another Quiz
        </button>
        
<button
        onClick={handleViewCorrectAnswers}
        className="mt-6 py-2 px-4 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-900 transition duration-300"
      >
        View Correct Answers
      </button>
        <button
          onClick={() => router.push("/")}
          className="mt-6 py-2 px-4 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-900 transition duration-300"
        >
          Go Home
        </button>
      </div>
    </section>
  );
}