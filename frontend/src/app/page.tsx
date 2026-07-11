import Header from "@/components/Header";
import UploadBox from "@/components/UploadBox";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 px-6 py-10">
      <Header />
      <UploadBox />
    </main>
  );
}