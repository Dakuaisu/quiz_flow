"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuiz } from "../context/QuizContext";

export default function Quizzes() {
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { setQuiz: setGlobalQuiz } = useQuiz();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await fetch("/api/proxy");
        if (!response.ok) throw new Error("Failed to fetch quizzes");
        let result = await response.json();
        setQuiz(result);
        setGlobalQuiz(result); // Store quiz data globally
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [setGlobalQuiz]);

  if (loading) return <p className="flex flex-col items-center text-white justify-center min-h-screen text-5xl font-bold mb-4">Loading quizzes...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white font-poppins text-center">
      <h1 className="text-5xl font-bold mb-4">List of Quizzes</h1>
      
      <a
        href={`/quiz/${quiz.id}`}
        onClick={(e) => {
          e.preventDefault();
          router.push(`/quiz/${quiz.id}`);
        }}
      >
        <h2 className="text-2xl ">{quiz.id} - {quiz.title}</h2>
      </a>
    </div>
  );
}