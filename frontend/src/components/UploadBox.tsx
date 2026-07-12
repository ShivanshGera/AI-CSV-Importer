"use client";

import { useRef, useState } from "react";
import { Upload } from "lucide-react";
import Papa from "papaparse";

import { uploadCSV } from "@/services/upload.service";

import { CsvRow } from "@/types/csv";
import { CRMRecord } from "@/types/crm";

interface UploadBoxProps {
  setCsvData: React.Dispatch<React.SetStateAction<CsvRow[]>>;
  setCrmData: React.Dispatch<React.SetStateAction<CRMRecord[]>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function UploadBox({
  setCsvData,
  setCrmData,
  loading,
  setLoading,
}: UploadBoxProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleButtonClick() {
    fileInputRef.current?.click();
  }

  function handleFileChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
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

  async function handleImport() {
    if (!selectedFile) return;

    try {
      setLoading(true);

      const response = await uploadCSV(selectedFile);

      setCrmData(response.data);

    } catch (error) {
      console.error(error);

      alert("Import failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mx-auto mt-10 w-full max-w-3xl rounded-2xl border-2 border-dashed border-gray-300 bg-white p-10 shadow-sm">

      <div className="flex flex-col items-center">

        <Upload
          size={60}
          className="text-blue-600"
        />

        <h2 className="mt-4 text-2xl font-bold">
          Upload CSV File
        </h2>

        <p className="mt-2 text-center text-gray-500">
          Drag & Drop your CSV file here or click below to browse.
        </p>

        <button
          onClick={handleButtonClick}
          className="mt-6 rounded-lg bg-blue-600 px-6 py-3 text-white"
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
          <>
            <p className="mt-4 text-green-600">
              {selectedFile.name}
            </p>

            <button
              onClick={handleImport}
              disabled={loading}
              className="mt-5 rounded-lg bg-green-600 px-6 py-3 text-white disabled:bg-gray-400"
            >
              {loading
                ? "Importing..."
                : "Import with AI"}
            </button>
          </>
        )}

      </div>

    </section>
  );
}