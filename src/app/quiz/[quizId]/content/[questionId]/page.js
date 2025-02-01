"use client";
import { useParams, useRouter } from "next/navigation";
import { useQuiz } from "../../../../context/QuizContext";

export default function ContentSectionsPage() {
  const { quizId, questionId } = useParams();
  const router = useRouter();
  const { quiz } = useQuiz();

  if (!quiz) return <p className="text-center text-gray-600">Loading...</p>;

  const question = quiz.questions.find((q) => q.id == questionId);

  if (!question) return <p className="text-center text-red-500">Question not found.</p>;

  return (
    <section className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-purple-600 mb-8">
        Content Sections for Question {questionId}
      </h1>

      {question.reading_material.content_sections.map((content, index) => (
        <div
          key={index}
          className="mb-6 p-4 bg-gray-50 rounded-lg"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      ))}

<button
          onClick={() => router.push(`/quiz/${quizId}/correct-answers`)}
          className="py-2 px-6 bg-indigo-900 text-white font-semibold rounded-lg hover:bg-teal-600 transition duration-300"
        >
          Back to Correct Answers
        </button>
    </section>
  );
}