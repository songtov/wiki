import { NextResponse } from 'next/server'
import { listPages, savePage, slugify } from '@/lib/blob'

export async function GET() {
  const pages = await listPages()
  return NextResponse.json(pages)
}

export async function POST(request) {
  const { title, content, tags } = await request.json()
  if (!title?.trim() || !content?.trim()) {
    return NextResponse.json({ error: 'Title and content are required' }, { status: 400 })
  }

  const slug = slugify(title)
  const now = new Date().toISOString()
  const page = {
    slug,
    title: title.trim(),
    content,
    tags: tags || [],
    createdAt: now,
    updatedAt: now,
  }

  await savePage(page)
  return NextResponse.json(page, { status: 201 })
}
