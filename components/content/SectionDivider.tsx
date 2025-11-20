export function SectionDivider({ title }: { title?: string }) {
  return (
    <div className="my-16 relative">
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-gradient-to-r from-transparent via-violet-500/30 to-transparent"></div>
      </div>
      {title && (
        <div className="relative flex justify-center">
          <span className="px-6 py-2 bg-zinc-900 text-sm font-semibold text-violet-300 rounded-full border border-violet-500/30">
            {title}
          </span>
        </div>
      )}
    </div>
  )
}
