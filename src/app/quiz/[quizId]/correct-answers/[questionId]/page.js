"use client";
import { useParams, useRouter } from "next/navigation";
import { useQuiz } from "../../../../context/QuizContext";

export default function DetailedSolutionPage() {
  const { quizId, questionId } = useParams();
  const router = useRouter();
  const { quiz } = useQuiz();

  if (!quiz) return <p className="text-center text-lg">Loading...</p>;

  const question = quiz.questions.find((q) => q.id == questionId);

  if (!question) return <p className="text-center text-lg text-red-600">Question not found.</p>;

  return (
    <section className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold text-indigo-900 text-center mb-6">
        Detailed Solution for Question {questionId}
      </h1>
      <h3 className="text-xl font-medium text-gray-800 mb-4">{question.description}</h3>

      <p className="text-lg text-gray-700">
        <strong>Correct Answer: </strong>
        <span className="text-green-600">
          {question.options.find((option) => option.is_correct)?.description}
        </span>
      </p>

      <p className="text-lg text-gray-700 mt-4">
        <strong>Detailed Solution:</strong>
        <span className="block mt-2 text-gray-600">{question.detailed_solution}</span>
      </p>

      <div className="mt-6 text-center">
        <button
          onClick={() => router.push(`/quiz/${quizId}/correct-answers`)}
          className="py-2 px-6 bg-indigo-900 text-white font-semibold rounded-lg hover:bg-teal-600 transition duration-300"
        >
          Back to Correct Answers
        </button>
      </div>
    </section>
  );
}
