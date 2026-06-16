import Link from 'next/link'
import { listPages } from '@/lib/blob'

export const dynamic = 'force-dynamic'

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default async function WikiListPage({ searchParams }) {
  const { tag } = await searchParams
  const pages = await listPages()
  const filtered = tag ? pages.filter((p) => p.tags.includes(tag)) : pages

  const allTags = [...new Set(pages.flatMap((p) => p.tags))].sort()

  return (
    <div>
      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          <Link
            href="/wiki"
            className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
              !tag ? 'bg-gray-900 text-white border-gray-900' : 'border-gray-300 text-gray-600 hover:border-gray-500'
            }`}
          >
            All
          </Link>
          {allTags.map((t) => (
            <Link
              key={t}
              href={`/wiki?tag=${encodeURIComponent(t)}`}
              className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                tag === t ? 'bg-gray-900 text-white border-gray-900' : 'border-gray-300 text-gray-600 hover:border-gray-500'
              }`}
            >
              {t}
            </Link>
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <p className="text-gray-500 text-sm">
          {tag ? `No pages tagged "${tag}".` : 'No pages yet. Create your first one!'}
        </p>
      ) : (
        <ul className="space-y-1">
          {filtered.map((page) => (
            <li key={page.slug}>
              <Link
                href={`/wiki/${page.slug}`}
                className="flex items-baseline justify-between py-2.5 px-3 rounded-md hover:bg-white hover:shadow-sm transition-all group"
              >
                <span className="font-medium text-gray-900 group-hover:text-gray-700">{page.title}</span>
                <span className="flex items-center gap-3 shrink-0 ml-4">
                  {page.tags.length > 0 && (
                    <span className="text-xs text-gray-400">
                      {page.tags.join(', ')}
                    </span>
                  )}
                  <span className="text-xs text-gray-400 tabular-nums">{formatDate(page.updatedAt)}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
