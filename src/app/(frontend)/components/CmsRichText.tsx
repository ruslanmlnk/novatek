import type { SerializedBlockNode } from '@payloadcms/richtext-lexical'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import type { RichTextData } from '@/lexical'
import { RichText, type JSXConvertersFunction } from '@payloadcms/richtext-lexical/react'

type GalleryNode = SerializedBlockNode<{
  blockType: 'gallery'
  images?: { image?: unknown }[] | null
}>

function imageUrl(image: unknown): string | undefined {
  if (typeof image === 'string') return image
  if (image && typeof image === 'object' && 'url' in image) {
    return (image as { url?: string | null }).url || undefined
  }
  return undefined
}

const converters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  heading: ({ node, nodesToJSX }) => (
    <h2
      className={
        node.tag === 'h3'
          ? 'text-2xl font-semibold leading-[1.4] text-white'
          : 'text-[26px] font-semibold leading-[1.45] text-white'
      }
    >
      {nodesToJSX({ nodes: node.children })}
    </h2>
  ),
  paragraph: ({ node, nodesToJSX }) => (
    <p className="text-lg font-medium leading-[1.45] text-novatek-muted">
      {nodesToJSX({ nodes: node.children })}
    </p>
  ),
  quote: ({ node, nodesToJSX }) => (
    <blockquote className="bg-[linear-gradient(136deg,#C5D487_2.79%,#7E8466_95.83%)] p-8 text-center text-lg font-medium leading-[1.45] text-white">
      &ldquo;{nodesToJSX({ nodes: node.children })}&rdquo;
    </blockquote>
  ),
  list: ({ node, nodesToJSX }) => {
    const isOrdered = node.tag === 'ol' || node.listType === 'number'
    const className =
      'grid gap-4 pl-7 text-lg font-medium leading-[1.45] text-novatek-muted marker:text-novatek-primary'

    if (isOrdered) {
      return (
        <ol
          className={`${className} list-outside list-decimal`}
          start={typeof node.start === 'number' ? node.start : undefined}
        >
          {nodesToJSX({ nodes: node.children })}
        </ol>
      )
    }

    return (
      <ul className={`${className} list-outside list-disc`}>
        {nodesToJSX({ nodes: node.children })}
      </ul>
    )
  },
  listitem: ({ node, nodesToJSX }) => (
    <li className="pl-1 text-lg font-medium leading-[1.45] text-novatek-muted marker:text-novatek-primary">
      {nodesToJSX({ nodes: node.children })}
    </li>
  ),
  upload: ({ node }) => {
    const url = imageUrl(node.value)
    if (!url) return null
    return <img className="w-full object-cover" src={url} alt="" />
  },
  blocks: {
    gallery: ({ node }: { node: GalleryNode }) => {
      const rows = node.fields.images ?? []
      const urls = rows
        .map((row) => imageUrl(row.image))
        .filter((url): url is string => Boolean(url))
      if (!urls.length) return null
      return (
        <div className="grid grid-cols-3 gap-8 max-md:grid-cols-1">
          {urls.map((url) => (
            <img
              className="aspect-square w-full object-cover max-md:aspect-auto max-md:h-[316px]"
              src={url}
              alt=""
              key={url}
            />
          ))}
        </div>
      )
    },
  },
})

export function CmsRichText({ data }: { data: RichTextData }) {
  return (
    <RichText
      className="grid gap-6"
      converters={converters}
      data={data as unknown as SerializedEditorState}
    />
  )
}
