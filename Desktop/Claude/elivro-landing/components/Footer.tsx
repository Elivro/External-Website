export default function Footer() {
  return (
    <footer className="w-full bg-black border-t border-zinc-800/50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">

          {/* Logo/Brand */}
          <div className="text-violet-500 text-lg font-semibold tracking-widest">
            ELIVRO
          </div>

          {/* Copyright */}
          <div className="text-zinc-500 text-sm">
            © {new Date().getFullYear()} Elivro. Assistans som förändrar liv.
          </div>

        </div>
      </div>
    </footer>
  )
}
