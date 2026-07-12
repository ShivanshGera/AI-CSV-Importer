"use client";

import { useState } from "react";

import Header from "@/components/Header";
import StatsCards from "@/components/StatsCards";
import UploadBox from "@/components/UploadBox";
import PreviewTable from "@/components/PreviewTable";
import ResultTable from "@/components/ResultTable";

import { CsvRow } from "@/types/csv";
import { CRMRecord } from "@/types/crm";

export default function Home() {
  const [csvData, setCsvData] = useState<CsvRow[]>([]);
  const [crmData, setCrmData] = useState<CRMRecord[]>([]);
  const [loading, setLoading] = useState(false);

  return (
    <main className="min-h-screen bg-gray-100 px-6 py-10">
      <Header />

      <StatsCards
        total={csvData.length}
        processed={crmData.length}
      />

      <UploadBox
        setCsvData={setCsvData}
        setCrmData={setCrmData}
        loading={loading}
        setLoading={setLoading}
      />

      <PreviewTable
        data={csvData}
      />

      <ResultTable
        data={crmData}
      />
    </main>
  );
}