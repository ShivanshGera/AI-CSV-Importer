"use client";

export default function UploadBox() {
  return (
    <section className="mx-auto mt-10 w-full max-w-3xl rounded-2xl border-2 border-dashed border-gray-300 bg-white p-10 shadow-sm">

      <div className="flex flex-col items-center">

        <div className="text-5xl">
          📄
        </div>

        <h2 className="mt-4 text-2xl font-bold">
          Upload CSV File
        </h2>

        <p className="mt-2 text-center text-gray-500">
          Drag & Drop your CSV file here or click below to browse.
        </p>

        <button
          className="mt-6 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
        >
          Choose File
        </button>

      </div>

    </section>
  );
}