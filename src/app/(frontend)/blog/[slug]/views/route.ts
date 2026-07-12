import { NextResponse } from 'next/server'

import { db } from '@/lib/payload'

type RouteContext = {
  params: Promise<{ slug: string }>
}

export async function POST(_request: Request, { params }: RouteContext) {
  const { slug } = await params
  const payload = await db()

  const { docs } = await payload.find({
    collection: 'posts',
    depth: 0,
    limit: 1,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  const post = docs[0]

  if (!post) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 })
  }

  const views = (post.views ?? 0) + 1

  await payload.update({
    collection: 'posts',
    id: post.id,
    data: { views },
    depth: 0,
    overrideAccess: true,
  })

  return NextResponse.json({ views })
}
