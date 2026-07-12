import { CsvRow } from "@/types/csv";

interface PreviewTableProps {
  data: CsvRow[];
}

export default function PreviewTable({ data }: PreviewTableProps) {
  if (!data.length) return null;

  const headers = Object.keys(data[0]);

  return (
    <section className="mx-auto mt-10 max-w-7xl rounded-2xl bg-white shadow-lg">
      <div className="flex items-center justify-between border-b p-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            CSV Preview
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Showing first {Math.min(10, data.length)} of {data.length} rows
          </p>
        </div>
      </div>

      <div className="max-h-[450px] overflow-auto">
        <table className="min-w-full text-sm">
          <thead className="sticky top-0 bg-gray-100">
            <tr>
              {headers.map((header) => (
                <th
                  key={header}
                  className="border-b px-5 py-3 text-left font-semibold text-gray-700"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.slice(0, 10).map((row, index) => (
              <tr
                key={index}
                className="transition hover:bg-gray-50 odd:bg-white even:bg-gray-50"
              >
                {headers.map((header) => (
                  <td
                    key={header}
                    className="border-b px-5 py-3"
                  >
                    {row[header]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}