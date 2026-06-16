import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPage } from '@/lib/blob'
import { MarkdownContent } from '@/app/components/MarkdownContent'
import { DeleteButton } from '@/app/components/DeleteButton'

export const dynamic = 'force-dynamic'

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default async function ViewPage({ params }) {
  const { slug } = await params
  const page = await getPage(slug)
  if (!page) notFound()

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Link href="/wiki" className="hover:text-gray-900 transition-colors">Wiki</Link>
          <span>/</span>
          <span className="text-gray-900">{page.title}</span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href={`/wiki/${slug}/edit`}
            className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            Edit
          </Link>
          <DeleteButton slug={slug} />
        </div>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-3">{page.title}</h1>

      <div className="flex items-center gap-3 mb-8 text-sm text-gray-400">
        <span>Updated {formatDate(page.updatedAt)}</span>
        {page.tags.length > 0 && (
          <>
            <span>·</span>
            <div className="flex gap-2">
              {page.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/wiki?tag=${encodeURIComponent(tag)}`}
                  className="hover:text-gray-600 transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </>
        )}
      </div>

      <MarkdownContent content={page.content} />
    </div>
  )
}
