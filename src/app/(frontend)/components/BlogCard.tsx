import type { blogPosts } from '../content'

type BlogCardProps = {
  post: (typeof blogPosts)[number]
  image?: string
}

export function BlogCard({ post, image }: BlogCardProps) {
  return (
    <a
      className="grid gap-8 bg-novatek-soft p-6 text-novatek-bg transition-opacity hover:opacity-90"
      href={`/blog/${post.slug}`}
    >
      <img className="h-60 w-full object-cover" src={image ?? post.image} alt="" />
      <div className="grid gap-4">
        <div className="flex items-center justify-between gap-4 max-sm:flex-col max-sm:items-start">
          <p className="text-lg font-medium leading-[1.45] text-novatek-primary">
            // {post.category} //
          </p>
          <time className="shrink-0 text-sm font-medium leading-[1.25] text-novatek-muted">
            {post.date}
          </time>
        </div>
        <div className="grid gap-2">
          <h2 className="text-[26px] font-semibold leading-[1.45] text-novatek-bg">{post.title}</h2>
          <p className="text-lg font-medium leading-[1.45] text-novatek-muted">
            {post.description}
          </p>
        </div>
      </div>
    </a>
  )
}
