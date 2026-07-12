import { CRMRecord } from "@/types/crm";

interface ResultTableProps {
  data: CRMRecord[];
}

export default function ResultTable({
  data,
}: ResultTableProps) {
  if (!data.length) return null;

  const headers = Object.keys(data[0]);

  return (
    <section className="mx-auto mt-10 max-w-7xl rounded-2xl bg-white shadow-lg">

      <div className="flex items-center justify-between border-b p-6">

        <div>

          <h2 className="text-2xl font-bold text-gray-800">
            AI Converted CRM Data
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Successfully processed {data.length} records
          </p>

        </div>

      </div>

      <div className="max-h-[500px] overflow-auto">

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

            {data.map((row, index) => (
              <tr
                key={index}
                className="transition hover:bg-gray-50 odd:bg-white even:bg-gray-50"
              >

                {headers.map((header) => (
                  <td
                    key={header}
                    className="border-b px-5 py-3"
                  >
                    {row[header as keyof CRMRecord] || "—"}
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