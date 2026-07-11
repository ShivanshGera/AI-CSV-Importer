"use client";

import { useRef, useState } from "react";
import { Upload } from "lucide-react";
import Papa from "papaparse";

import { CsvRow } from "@/types/csv";

interface UploadBoxProps {
  setCsvData: React.Dispatch<React.SetStateAction<CsvRow[]>>;
}

export default function UploadBox({ setCsvData }: UploadBoxProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleButtonClick() {
    fileInputRef.current?.click();
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    setSelectedFile(file);

    Papa.parse<CsvRow>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        setCsvData(results.data);
      },
    });
  }

  return (
    <section className="mx-auto mt-10 w-full max-w-3xl rounded-2xl border-2 border-dashed border-gray-300 bg-white p-10 shadow-sm">
      <div className="flex flex-col items-center">
        <Upload size={60} className="text-blue-600" />

        <h2 className="mt-4 text-2xl font-bold">
          Upload CSV File
        </h2>

        <p className="mt-2 text-center text-gray-500">
          Drag & Drop your CSV file here or click below to browse.
        </p>

        <button
          onClick={handleButtonClick}
          className="mt-6 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
        >
          Choose File
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          className="hidden"
          onChange={handleFileChange}
        />

        {selectedFile && (
          <p className="mt-4 text-green-600 font-medium">
            Selected: {selectedFile.name}
          </p>
        )}
      </div>
    </section>
  );
}