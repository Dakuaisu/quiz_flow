"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-br from-[#158e8c] to-[#2b275d] p-4 top-0 left-0 w-full z-10">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo or Brand Name */}
        <Link href="/" className="text-white text-2xl font-bold">
          Quiz Flow
        </Link>

        {/* Navigation Links */}
        <div className="space-x-4">
          <Link
            href="/"
            className="text-white hover:text-gray-200 transition duration-300"
          >
            Home
          </Link>
          <Link
            href="/ListofQuizes"
            className="text-white hover:text-gray-200 transition duration-300"
          >
            Quizzes
          </Link>
          <Link
            href="/About_Me"
            className="text-white hover:text-gray-200 transition duration-300"
          >
            About Me
          </Link>
        </div>
      </div>
    </nav>
  );
}