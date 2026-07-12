interface StatsCardsProps {
  total: number;
  processed: number;
}

export default function StatsCards({
  total,
  processed,
}: StatsCardsProps) {
  const skipped = total - processed;

  const cards = [
    {
      title: "Total Records",
      value: total,
      color: "text-blue-600",
    },
    {
      title: "Processed",
      value: processed,
      color: "text-green-600",
    },
    {
      title: "Skipped",
      value: skipped,
      color: "text-red-600",
    },
  ];

  return (
    <section className="mx-auto mt-8 grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-2xl bg-white p-6 shadow-md"
        >
          <p className="text-gray-500">{card.title}</p>

          <h2
            className={`mt-2 text-4xl font-bold ${card.color}`}
          >
            {card.value}
          </h2>
        </div>
      ))}
    </section>
  );
}