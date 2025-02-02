"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuiz } from "../../../context/QuizContext";

export default function CorrectAnswersPage() {
  const { quizId } = useParams();
  const router = useRouter();
  const { quiz, setQuiz } = useQuiz(); // Add setQuiz from context
  const [loading, setLoading] = useState(!quiz); // Track loading state
  const [error, setError] = useState(null); // Track errors

  // Fetch quiz data if not available
  useEffect(() => {
    if (!quiz) {
      const fetchQuiz = async () => {
        try {
          setLoading(true);
          const response = await fetch(`/api/proxy?quizId=${quizId}`);
          if (!response.ok) throw new Error("Failed to fetch quiz");
          const data = await response.json();
          setQuiz(data); // Update global quiz state
        } catch (error) {
          console.error("Error fetching quiz:", error);
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchQuiz();
    }
  }, [quizId, quiz, setQuiz]);

  // Handle loading and error states
  if (loading) return <p className="text-center text-lg">Loading quiz data...</p>;
  if (error) return <p className="text-center text-lg text-red-600">Error: {error}</p>;
  if (!quiz) return <p className="text-center text-lg text-red-600">Quiz not found!</p>;

  // Ensure the quiz ID matches
  if (quiz.id !== parseInt(quizId)) {
    return <p className="text-center text-lg text-red-600">Quiz not found!</p>;
  }

  const handleViewDetailedSolution = (questionId) => {
    router.push(`/quiz/${quizId}/correct-answers/${questionId}`);
  };

  return (
    <section className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold text-indigo-900 text-center mb-6">
        Correct Answers for Quiz {quizId}
      </h1>

      {quiz.questions?.length ? (
        quiz.questions.map((question) => (
          <div key={question.id} className="mb-6 p-4 bg-gray-50 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800">{question.description}</h3>
            <p className="text-lg text-gray-700">
              Correct Answer:{" "}
              <strong className="text-green-600">
                {question.options.find((option) => option.is_correct)?.description ||
                  "No correct answer found"}
              </strong>
            </p>
            <button
              onClick={() => handleViewDetailedSolution(question.id)}
              className="mt-4 py-2 px-4 bg-gradient-to-br from-[#158e8c] to-[#2b275d] text-white  w-80 rounded-full text-white font-semibold  hover:bg-teal-600 transition duration-300"
            >
              View Detailed Solution
            </button>
            <button
              onClick={() => router.push(`/quiz/${quizId}/content/${question.id}`)}
              className="ml-4 mt-4 px-4 py-2 bg-gradient-to-br from-[#2b275d] to-[#158e8c] text-white  w-80 rounded-full text-white font-semibold  hover:bg-indigo-900 transition duration-200"
            >
              View Reading Material
            </button>
          </div>
        ))
      ) : (
        <p className="text-center text-lg text-gray-600">No questions available for this quiz.</p>
      )}

      <br />

      <div className="text-center">
        <a
          href={`/quiz/${quizId}/results?score=${localStorage.getItem("score")}`}
          className="text-indigo-900 hover:text-teal-600 transition duration-200"
        >
          Back to Results
        </a>
      </div>
    </section>
  );
}