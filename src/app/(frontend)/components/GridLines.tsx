type GridLinesProps = {
  height: number
  opacity?: number
}

const COLUMN_X = [74, 397, 720, 1043, 1366]

export function GridLines({ height, opacity = 0.1 }: GridLinesProps) {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      preserveAspectRatio="none"
      viewBox={`0 0 1440 ${height}`}
      fill="none"
      aria-hidden="true"
    >
      {COLUMN_X.map((x) => (
        <path d={`M${x} 0V${height}`} key={x} stroke="white" strokeOpacity={opacity} />
      ))}
    </svg>
  )
}
