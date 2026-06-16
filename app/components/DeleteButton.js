'use client'

import { useRouter } from 'next/navigation'

export function DeleteButton({ slug }) {
  const router = useRouter()

  async function handleDelete() {
    if (!confirm('Delete this page?')) return
    await fetch(`/api/pages/${slug}`, { method: 'DELETE' })
    router.push('/wiki')
  }

  return (
    <button
      onClick={handleDelete}
      className="text-sm text-red-500 hover:text-red-700 transition-colors"
    >
      Delete
    </button>
  )
}
