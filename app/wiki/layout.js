import Link from 'next/link'

export default function WikiLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/wiki" className="font-semibold text-gray-900 hover:text-gray-600 transition-colors">
            My Wiki
          </Link>
          <Link
            href="/wiki/new"
            className="text-sm bg-gray-900 text-white px-3 py-1.5 rounded-md hover:bg-gray-700 transition-colors"
          >
            + New Page
          </Link>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 py-8">{children}</main>
    </div>
  )
}
