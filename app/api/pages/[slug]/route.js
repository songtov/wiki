import { NextResponse } from 'next/server'
import { getPage, savePage, deletePage } from '@/lib/blob'

export async function GET(_, { params }) {
  const { slug } = await params
  const page = await getPage(slug)
  if (!page) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(page)
}

export async function PUT(request, { params }) {
  const { slug } = await params
  const existing = await getPage(slug)
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const { title, content, tags } = await request.json()
  const page = {
    ...existing,
    title: title ?? existing.title,
    content: content ?? existing.content,
    tags: tags ?? existing.tags,
    updatedAt: new Date().toISOString(),
  }

  await savePage(page)
  return NextResponse.json(page)
}

export async function DELETE(_, { params }) {
  const { slug } = await params
  await deletePage(slug)
  return NextResponse.json({ ok: true })
}
