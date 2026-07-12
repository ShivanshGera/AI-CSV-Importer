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
    <div className="mx-auto mt-10 max-w-7xl overflow-auto rounded-xl bg-white shadow">

      <h2 className="p-4 text-2xl font-bold">
        AI Output
      </h2>

      <table className="min-w-full">

        <thead>

          <tr>

            {headers.map((header) => (
              <th
                key={header}
                className="border bg-gray-100 px-3 py-2 text-left"
              >
                {header}
              </th>
            ))}

          </tr>

        </thead>

        <tbody>

          {data.map((row, index) => (
            <tr key={index}>

              {headers.map((header) => (
                <td
                  key={header}
                  className="border px-3 py-2"
                >
                  {row[header as keyof CRMRecord]}
                </td>
              ))}

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}