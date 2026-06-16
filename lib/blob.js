import { list, put, del } from '@vercel/blob'

export function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export async function getPage(slug) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return null
  const { blobs } = await list({ prefix: `pages/${slug}.json` })
  const blob = blobs.find((b) => b.pathname === `pages/${slug}.json`)
  if (!blob) return null
  const res = await fetch(blob.url, { cache: 'no-store' })
  if (!res.ok) return null
  return res.json()
}

export async function listPages() {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return []
  const { blobs } = await list({ prefix: 'pages/' })
  const pages = await Promise.all(
    blobs.map(async (b) => {
      const res = await fetch(b.url, { cache: 'no-store' })
      return res.json()
    })
  )
  return pages.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
}

export async function savePage(page) {
  await put(`pages/${page.slug}.json`, JSON.stringify(page), {
    addRandomSuffix: false,
    access: 'public',
    contentType: 'application/json',
  })
}

export async function deletePage(slug) {
  const { blobs } = await list({ prefix: `pages/${slug}.json` })
  const blob = blobs.find((b) => b.pathname === `pages/${slug}.json`)
  if (blob) await del(blob.url)
}
