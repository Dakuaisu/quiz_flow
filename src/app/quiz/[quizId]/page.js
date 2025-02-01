"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuiz } from "../../context/QuizContext";

export default function QuizPage() {
  const { quizId } = useParams();
  const router = useRouter();
  const { quiz, setQuiz } = useQuiz();
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(!quiz);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!quiz) {
      const fetchQuiz = async () => {
        try {
          setLoading(true);
          const response = await fetch(`/api/proxy?quizId=${quizId}`);
          if (!response.ok) throw new Error("Failed to fetch quiz");
          const data = await response.json();
          setQuiz(data);
          console.log("Quiz data fetched:", data);
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

  const calculateScore = () => {
    let score = 0;
    quiz.questions.forEach((question) => {
      const selectedOptionId = answers[question.id];
      if (selectedOptionId) {
        const selectedOption = question.options.find(
          (option) => option.id === selectedOptionId
        );
        if (selectedOption.isCorrect) {
          score += 4; // +4 for correct answer
        } else {
          score -= 1; // -1 for wrong answer
        }
      }
      // 0 points for unanswered questions
    });
    return score;
  };

  const handleSubmit = () => {
    const score = calculateScore();
    router.push(`/quiz/${quizId}/results?score=${score}`); // Redirect to results page with score
  };

  if (loading) return <p className="text-center text-gray-600">Loading quiz...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;
  if (!quiz) return <p className="text-center text-gray-600">No quiz data found.</p>;

  return (
    <section className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center text-indigo-900 mb-8">
        {quiz.title}
      </h1>

      {quiz.questions.map((question, index) => (
        <div key={question.id} className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            {index + 1}. {question.description}
          </h3>
          {question.options.map((option) => (
            <label
              key={option.id}
              className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition duration-200"
            >
              <input
                type="radio"
                name={`question-${question.id}`}
                value={option.id}
                checked={answers[question.id] === option.id}
                onChange={() => setAnswers({ ...answers, [question.id]: option.id })}
                className="form-radio h-5 w-5 text-purple-600"
              />
              <span className="text-gray-700">{option.description}</span>
              {answers[question.id] === option.id && (
                <span className="text-green-500"></span>
              )}
            </label>
          ))}
        </div>
      ))}

      <div className="text-center">
        <button
          onClick={handleSubmit}
          className="px-8 py-3 bg-indigo-900 text-white font-semibold rounded-lg hover:bg-teal-600 transition duration-200"
        >
          Submit Quiz
        </button>
      </div>
    </section>
  );
}