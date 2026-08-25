import './kunskap-prose.css'

/**
 * Deliberately exports NO metadata. Anything declared here — canonical
 * above all — would be inherited by every child route, which is exactly
 * the bug that had /quiz reporting itself as a duplicate of the homepage.
 * Canonical belongs to the page. See app/(app)/layout.tsx.
 */
export default function KunskapLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
