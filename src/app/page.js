"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LandingPage() {
  const router = useRouter();

  const handleListOfQuizzes = () => {
    router.push("/ListofQuizes");
  };

  return (
    <div className="flex items-center justify-center min-h-screen  text-[#2b275d] font-poppins">
      {/* Left Side - Text */}
      <div className="w-[48%] flex flex-col justify-center pl-12">
        <h1 className="text-4xl  mb-2">Test Your Knowledge</h1>
        <p className="text-6xl font-bold mb-6">
          Challenge Yourself.
        </p>
        <p className="text-2xl/6  text-black mb-8">Welcome to the ultimate quiz experience! Whether you are a trivia enthusiast, a student looking to learn in a fun way, or just someone who loves a good challenge.</p>
        <button
          onClick={handleListOfQuizzes}
          className="px-8 py-3 text-lg font-semibold bg-gradient-to-br from-[#158e8c] to-[#2b275d] text-white  w-80 rounded-full shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200"
           >
          List of Quizzes
        </button>
      </div>
      
      {/* Right Side - Image */}
      <div className="w-[48%] flex justify-center pr-12">
        <Image 
          src="/IMG_6736.gif" // Replace with your actual image path
          alt="Quiz Illustration"
          width={600} 
          height={600} 
          className="rounded-lg"
        />
      </div>
    </div>
  );
}
