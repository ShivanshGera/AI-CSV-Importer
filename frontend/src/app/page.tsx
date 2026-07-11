"use client";

import { useState } from "react";

import Header from "@/components/Header";
import UploadBox from "@/components/UploadBox";
import PreviewTable from "@/components/PreviewTable";

import { CsvRow } from "@/types/csv";

export default function Home() {
  const [csvData, setCsvData] = useState<CsvRow[]>([]);

  return (
    <main className="min-h-screen bg-gray-100 px-6 py-10">
      <Header />

      <UploadBox setCsvData={setCsvData} />

      <PreviewTable data={csvData} />
    </main>
  );
}