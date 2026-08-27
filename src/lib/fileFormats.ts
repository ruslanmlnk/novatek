const extensionAliases: Record<string, string[]> = {
  jpeg: ['jpeg', 'jpg'],
  jpg: ['jpg', 'jpeg'],
  step: ['step', 'stp'],
  stp: ['stp', 'step'],
}

export function extensionsFromFormats(formats: string): string[] {
  const extensions = formats
    .split(/[\s,;]+/)
    .map((format) => format.trim().toLowerCase().replace(/^\./, ''))
    .filter((format) => /^[a-z0-9]+$/.test(format))
    .flatMap((format) => extensionAliases[format] ?? [format])

  return [...new Set(extensions)]
}

export function acceptFromFormats(formats: string): string {
  return extensionsFromFormats(formats)
    .map((extension) => `.${extension}`)
    .join(',')
}
