import { randomUUID } from 'crypto'

/** Shape of a lexical richText value as stored by Payload */
export type RichTextData = {
  [k: string]: unknown
  root: {
    type: string
    children: { [k: string]: unknown; type: string; version: number }[]
    direction: ('ltr' | 'rtl') | null
    format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | ''
    indent: number
    version: number
  }
}

type Node = Record<string, unknown>

const block = (node: Node): Node => ({
  direction: 'ltr',
  format: '',
  indent: 0,
  version: 1,
  ...node,
})

export const text = (value: string): Node => ({
  type: 'text',
  detail: 0,
  format: 0,
  mode: 'normal',
  style: '',
  text: value,
  version: 1,
})

export const paragraph = (value: string): Node =>
  block({ type: 'paragraph', children: [text(value)], textFormat: 0, textStyle: '' })

export const heading = (value: string, tag: 'h2' | 'h3' = 'h2'): Node =>
  block({ type: 'heading', tag, children: [text(value)] })

export const quote = (value: string): Node => block({ type: 'quote', children: [text(value)] })

export const bulletList = (values: string[]): Node =>
  block({
    type: 'list',
    listType: 'bullet',
    tag: 'ul',
    start: 1,
    children: values.map((value, index) =>
      block({ type: 'listitem', value: index + 1, children: [text(value)] }),
    ),
  })

export const galleryBlock = (images: (number | string)[]): Node => ({
  type: 'block',
  format: '',
  version: 2,
  fields: {
    id: randomUUID(),
    blockType: 'gallery',
    images: images.map((image) => ({ id: randomUUID(), image })),
  },
})

export const editorState = (children: Node[]): RichTextData =>
  ({
    root: {
      type: 'root',
      children,
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  }) as RichTextData

export type ArticleContent = {
  overview: string
  keyPoints: string[]
  details: string
  quote: string
  conclusion: string
}

export const articleContent = (article: ArticleContent): RichTextData =>
  editorState([
    heading('Overview:'),
    paragraph(article.overview),
    bulletList(article.keyPoints),
    paragraph(article.details),
    quote(article.quote),
    paragraph(article.conclusion),
  ])

export type CaseContent = {
  overview: string
  approach: string
  gallery: (number | string)[]
  specs: string[]
  results: string
}

export const caseContent = (details: CaseContent): RichTextData =>
  editorState([
    heading('Project Overview:'),
    paragraph(details.overview),
    heading('Approach:'),
    paragraph(details.approach),
    galleryBlock(details.gallery),
    heading('Technical Specifications:'),
    bulletList(details.specs),
    heading('Results:'),
    paragraph(details.results),
  ])
