"use client";
import { useParams, useRouter } from "next/navigation";
import { useQuiz } from "../../../context/QuizContext";

export default function CorrectAnswersPage() {
  const { quizId } = useParams(); // Get the quizId from the URL
  const router = useRouter();
  const { quiz } = useQuiz(); // Access quiz data from context

  // Check if quiz is loaded
  if (!quiz) return <p className="text-center text-lg">Loading quiz data...</p>;

  // Ensure quizId matches the loaded quiz data (optional, if necessary)
  if (quiz.id !== parseInt(quizId)) {
    return <p className="text-center text-lg text-red-600">Quiz not found!</p>;
  }

  // Handle redirect to detailed solution page
  const handleViewDetailedSolution = (questionId) => {
    router.push(`/quiz/${quizId}/correct-answers/${questionId}`); // Redirect to detailed solution page
  };

  return (
    <section className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold text-indigo-900 text-center mb-6">
        Correct Answers for Quiz {quizId}
      </h1>

      {/* Check if quiz questions are loaded */}
      {quiz.questions?.length ? (
        quiz.questions.map((question) => (
          <div key={question.id} className="mb-6 p-4 bg-gray-50 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800">{question.description}</h3>
            <p className="text-lg text-gray-700">
              Correct Answer:{" "}
              <strong className="text-green-600">
                {question.options.find((option) => option.is_correct)?.description || "No correct answer found"}
              </strong>
            </p>
            <button
              onClick={() => handleViewDetailedSolution(question.id)}
              className="mt-4 py-2 px-4 bg-indigo-900 text-white font-semibold rounded-lg hover:bg-teal-600 transition duration-300"
            >
              View Detailed Solution
            </button>
            <button
            onClick={() => router.push(`/quiz/${quizId}/content/${question.id}`)}
            className="ml-4 mt-4 px-4 py-2 bg-teal-600 text-white font-semibold rounded-lg hover:bg-indigo-900 transition duration-200"
          >
            View Reading Material
          </button>
          </div>
        ))
      ) : (
        <p className="text-center text-lg text-gray-600">No questions available for this quiz.</p>
      )}

      <br />
      {/* Back to Results button */}
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
