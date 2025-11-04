/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    'p-[1px]',
    'bg-[linear-gradient(135deg,#8b5cf6,#22d3ee)]',
    'shadow-[0_10px_30px_rgba(139,92,246,.25)]',
    'group-hover:shadow-[0_14px_34px_rgba(139,92,246,.35)]',
  ],
}
