"use client";

import { useRef, useState } from "react";
import { Upload } from "lucide-react";
import { TailSpin } from "react-loader-spinner";
import { toast } from "sonner";
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

      toast.success(
        `Successfully processed ${response.processedRecords} records`
      );
    } catch (error) {
      console.error(error);

      toast.error("Import failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mx-auto mt-10 w-full max-w-3xl rounded-3xl border border-gray-200 bg-white p-10 shadow-xl">
      <div className="flex flex-col items-center">
        <div className="rounded-full bg-blue-100 p-5">
          <Upload size={70} className="text-blue-600" />
        </div>

        <h2 className="mt-6 text-3xl font-bold text-gray-800">
          Upload CSV File
        </h2>

        <p className="mt-3 max-w-md text-center leading-7 text-gray-500">
          Upload your CSV file and let Gemini AI intelligently convert it into
          GrowEasy CRM format.
        </p>

        <button
          onClick={handleButtonClick}
          className="mt-8 rounded-xl bg-blue-600 px-8 py-3 font-medium text-white transition hover:bg-blue-700"
        >
          Choose CSV File
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
            <div className="mt-6 w-full max-w-md rounded-xl border border-green-200 bg-green-50 p-4">
              <p className="font-semibold text-green-700">
                📄 {selectedFile.name}
              </p>

              <p className="mt-1 text-sm text-green-600">
                Ready for AI processing
              </p>
            </div>

            <button
              onClick={handleImport}
              disabled={loading}
              className="mt-6 flex items-center gap-3 rounded-xl bg-green-600 px-8 py-3 font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              {loading ? (
                <>
                  <TailSpin
                    height={22}
                    width={22}
                    color="#ffffff"
                  />
                  Processing with Gemini...
                </>
              ) : (
                <>🤖 Import with AI</>
              )}
            </button>
          </>
        )}
      </div>
    </section>
  );
}