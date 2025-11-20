import { DemoCTA } from '@/components/content/DemoCTA'
import { DownloadCTA } from '@/components/content/DownloadCTA'
import { ComparisonTable, Check, Cross, Partial } from '@/components/content/ComparisonTable'
import { InfoCard } from '@/components/content/InfoCard'
import { StatCard, StatGrid } from '@/components/content/StatCard'
import { StepCard, StepContainer } from '@/components/content/StepCard'
import { Callout } from '@/components/content/Callout'
import { CostBreakdown, CostItem } from '@/components/content/CostBreakdown'
import { Checklist, ChecklistItem } from '@/components/content/Checklist'
import { ComparisonGrid, ComparisonCard } from '@/components/content/ComparisonGrid'
import { SectionDivider } from '@/components/content/SectionDivider'

// Custom ComparisonTable wrapper for headers/rows format used in blog posts
interface SimpleComparisonTableProps {
  headers: string[]
  rows: string[][]
}

function SimpleComparisonTable({ headers, rows }: SimpleComparisonTableProps) {
  return (
    <div className="my-8 overflow-x-auto">
      <table className="w-full border-collapse border border-zinc-800">
        <thead>
          <tr className="border-b border-zinc-700 bg-zinc-900">
            {headers.map((header, i) => (
              <th
                key={i}
                className={`text-left py-4 px-4 font-semibold ${
                  i === headers.length - 1 ? 'text-white bg-violet-500/10' : 'text-zinc-300'
                }`}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b border-zinc-800 hover:bg-zinc-900/50 transition-colors">
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className={`py-4 px-4 ${
                    cellIndex === row.length - 1
                      ? 'bg-violet-500/5 text-white font-medium'
                      : 'text-zinc-300'
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export const mdxComponents = {
  DemoCTA,
  DownloadCTA,
  ComparisonTable: SimpleComparisonTable,
  Check,
  Cross,
  Partial,
  // New stunning design components
  InfoCard,
  StatCard,
  StatGrid,
  StepCard,
  StepContainer,
  Callout,
  CostBreakdown,
  CostItem,
  Checklist,
  ChecklistItem,
  ComparisonGrid,
  ComparisonCard,
  SectionDivider,
}
