"use client";

import { useState } from "react";

export default function Home() {
  const [count, setCount] = useState(0);

  return (
    <main className="min-h-screen flex items-center justify-center">
      <button
        onClick={() => setCount(count + 1)}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg"
      >
        Count: {count}
      </button>
    </main>
  );
}