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
      <h1 className="text-3xl font-bold mb-8">
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
          className="py-2 px-6 bg-gradient-to-br from-[#158e8c] to-[#2b275d] text-white  w-80 rounded-full text-white font-semibold hover:bg-teal-600 transition duration-300"
        >
          Back to Correct Answers
        </button>
    </section>
  );
}