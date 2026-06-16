'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function EditPage({ params }) {
  const [slug, setSlug] = useState(null)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [tags, setTags] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    params.then(({ slug: s }) => {
      setSlug(s)
      fetch(`/api/pages/${s}`)
        .then((r) => r.json())
        .then((page) => {
          setTitle(page.title)
          setContent(page.content)
          setTags(page.tags.join(', '))
        })
    })
  }, [params])

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    setError('')

    const res = await fetch(`/api/pages/${slug}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        content,
        tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
      }),
    })

    if (res.ok) {
      router.push(`/wiki/${slug}`)
    } else {
      const data = await res.json()
      setError(data.error || 'Failed to save')
      setSaving(false)
    }
  }

  if (!slug) return <div className="text-sm text-gray-400">Loading…</div>

  return (
    <div>
      <div className="flex items-center gap-2 mb-6 text-sm text-gray-500">
        <Link href="/wiki" className="hover:text-gray-900 transition-colors">Wiki</Link>
        <span>/</span>
        <Link href={`/wiki/${slug}`} className="hover:text-gray-900 transition-colors">{title || slug}</Link>
        <span>/</span>
        <span className="text-gray-900">Edit</span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Page title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-2xl font-semibold border-0 border-b border-gray-200 pb-2 focus:outline-none focus:border-gray-900 placeholder-gray-300 bg-transparent"
            required
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="Tags (comma separated: python, learning)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full text-sm border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent placeholder-gray-400"
          />
        </div>

        <div>
          <textarea
            placeholder="Write your content here (Markdown supported)..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={20}
            className="w-full font-mono text-sm border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent placeholder-gray-400 resize-none"
            required
          />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={saving}
            className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 disabled:opacity-50 transition-colors"
          >
            {saving ? 'Saving…' : 'Save Changes'}
          </button>
          <Link
            href={`/wiki/${slug}`}
            className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}
