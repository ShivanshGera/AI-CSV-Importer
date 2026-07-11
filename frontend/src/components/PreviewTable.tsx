import { CsvRow } from "@/types/csv";

interface PreviewTableProps {
  data: CsvRow[];
}

export default function PreviewTable({
  data,
}: PreviewTableProps) {
  if (data.length === 0) return null;

  const headers = Object.keys(data[0]);

  return (
    <div className="mx-auto mt-8 max-w-6xl overflow-auto rounded-xl bg-white shadow">

      <table className="min-w-full border-collapse">

        <thead>

          <tr className="bg-gray-100">

            {headers.map((header) => (
              <th
                key={header}
                className="border px-4 py-2 text-left"
              >
                {header}
              </th>
            ))}

          </tr>

        </thead>

        <tbody>

          {data.slice(0,10).map((row, index) => (
            <tr key={index}>

              {headers.map((header) => (
                <td
                  key={header}
                  className="border px-4 py-2"
                >
                  {row[header]}
                </td>
              ))}

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}