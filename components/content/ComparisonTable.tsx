interface ComparisonRow {
  feature: string
  competitor: string | React.ReactNode
  elivro: string | React.ReactNode
}

interface ComparisonTableProps {
  competitorName: string
  data: ComparisonRow[]
}

export function ComparisonTable({ competitorName, data }: ComparisonTableProps) {
  return (
    <div className="my-8 overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-zinc-700">
            <th className="text-left py-4 px-4 text-zinc-300 font-semibold">Funktion</th>
            <th className="text-center py-4 px-4 text-zinc-300 font-semibold">{competitorName}</th>
            <th className="text-center py-4 px-4 bg-violet-500/10 text-white font-semibold rounded-t-lg">
              Elivro
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={index}
              className="border-b border-zinc-800 hover:bg-zinc-900/50 transition-colors"
            >
              <td className="py-4 px-4 text-white font-medium">{row.feature}</td>
              <td className="py-4 px-4 text-center text-zinc-400">{row.competitor}</td>
              <td className="py-4 px-4 text-center bg-violet-500/5 text-white font-medium">
                {row.elivro}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-6 p-4 bg-zinc-900/50 rounded-lg border border-zinc-800">
        <p className="text-sm text-zinc-400">
          ℹ️ Data baserad på offentligt tillgänglig information per november 2025.
          För exakta funktioner och priser, kontakta respektive leverantör.
        </p>
      </div>
    </div>
  )
}

// Utility components for common table values
export const Check = () => (
  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-500/20 text-green-400">
    ✓
  </span>
)

export const Cross = () => (
  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-500/20 text-red-400">
    ✗
  </span>
)

export const Partial = () => (
  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-yellow-500/20 text-yellow-400">
    ~
  </span>
)
