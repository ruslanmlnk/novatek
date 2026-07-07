import type { siteData } from '../../data'
import { ArrowGlyph } from '../IconSet'
import { HighlightedTitle } from '../SectionHeading'

type TestimonialsSectionProps = typeof siteData.testimonials

function TestimonialLogo() {
  return (
    <div className="inline-flex w-[180px] items-center gap-[13px]" aria-label="Novatek Engineering">
      <svg
        className="size-[42px] shrink-0"
        width="42"
        height="42"
        viewBox="0 0 42 42"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M42 4.97534V36.9043L36.9018 41.9948L30.7934 42L6.54811 16.6033V27.6285L10.097 31.4253V42H4.97782L0 37.0247V5.09043L5.09821 0H11.2066L35.4519 25.3915V13.843L31.903 10.225V0H37.0222L42 4.97534Z"
          fill="white"
        />
      </svg>
      <span className="grid gap-[5px] leading-none">
        <strong className="text-[28px] font-medium leading-[24px] text-white">Novatek</strong>
        <small className="text-[10px] font-medium uppercase leading-none tracking-[0.34em] text-white">
          Engineering
        </small>
      </span>
    </div>
  )
}

function GradientStars({
  className,
  height,
  prefix,
  viewBox,
  width,
}: {
  className?: string
  height: number
  prefix: string
  viewBox: string
  width: number
}) {
  const smallPaths = [
    'M14.902 5.1718L9.53833 4.81915L7.51807 -0.255859L5.49781 4.81915L0.139648 5.1718L4.24965 8.66127L2.90123 13.9547L7.51807 11.0362L12.1349 13.9547L10.7865 8.66127L14.902 5.1718Z',
    'M33.6647 5.1718L28.301 4.81915L26.2808 -0.255859L24.2605 4.81915L18.9023 5.1718L23.0123 8.66127L21.6639 13.9547L26.2808 11.0362L30.8976 13.9547L29.5492 8.66127L33.6647 5.1718Z',
    'M52.4274 5.1718L47.0637 4.81915L45.0435 -0.255859L43.0232 4.81915L37.665 5.1718L41.775 8.66127L40.4266 13.9547L45.0435 11.0362L49.6603 13.9547L48.3119 8.66127L52.4274 5.1718Z',
    'M71.1901 5.1718L65.8264 4.81915L63.8062 -0.255859L61.7859 4.81915L56.4277 5.1718L60.5377 8.66127L59.1893 13.9547L63.8062 11.0362L68.423 13.9547L67.0746 8.66127L71.1901 5.1718Z',
    'M89.9528 5.1718L84.5891 4.81915L82.5689 -0.255859L80.5486 4.81915L75.1904 5.1718L79.3004 8.66127L77.952 13.9547L82.5689 11.0362L87.1857 13.9547L85.8373 8.66127L89.9528 5.1718Z',
  ]
  const largePaths = [
    'M19.8687 7.56257L12.7171 7.09237L10.0234 0.325684L7.32976 7.09237L0.185547 7.56257L5.66555 12.2152L3.86765 19.2731L10.0234 15.3817L16.1792 19.2731L14.3813 12.2152L19.8687 7.56257Z',
    'M43.5523 7.56257L36.4007 7.09237L33.707 0.325684L31.0134 7.09237L23.8691 7.56257L29.3491 12.2152L27.5512 19.2731L33.707 15.3817L39.8628 19.2731L38.0649 12.2152L43.5523 7.56257Z',
    'M67.2359 7.56257L60.0843 7.09237L57.3906 0.325684L54.6969 7.09237L47.5527 7.56257L53.0327 12.2152L51.2348 19.2731L57.3906 15.3817L63.5464 19.2731L61.7485 12.2152L67.2359 7.56257Z',
    'M90.9195 7.56257L83.7679 7.09237L81.0742 0.325684L78.3805 7.09237L71.2363 7.56257L76.7163 12.2152L74.9184 19.2731L81.0742 15.3817L87.23 19.2731L85.4321 12.2152L90.9195 7.56257Z',
    'M114.603 7.56257L107.451 7.09237L104.758 0.325684L102.064 7.09237L94.9199 7.56257L100.4 12.2152L98.602 19.2731L104.758 15.3817L110.914 19.2731L109.116 12.2152L114.603 7.56257Z',
  ]
  const paths = width === 115 ? largePaths : smallPaths

  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox={viewBox}
      fill="none"
      aria-hidden="true"
    >
      {paths.map((path, index) => (
        <path d={path} fill={`url(#${prefix}-${index})`} key={path} />
      ))}
      <defs>
        {paths.map((path, index) => (
          <linearGradient
            gradientUnits="userSpaceOnUse"
            id={`${prefix}-${index}`}
            key={path}
            x1={index * (width === 115 ? 23.6836 : 18.7627) + (width === 115 ? 1.0466 : 0.7854)}
            x2={index * (width === 115 ? 23.6836 : 18.7627) + (width === 115 ? 18.3192 : 13.7399)}
            y1={width === 115 ? 0.562959 : -0.0779026}
            y2={width === 115 ? 19.1599 : 13.8698}
          >
            <stop stopColor="#C5D487" />
            <stop offset="1" stopColor="#7E8466" />
          </linearGradient>
        ))}
      </defs>
    </svg>
  )
}

function TestimonialNav() {
  return (
    <div className="flex shrink-0 items-center gap-3">
      <button
        aria-label="Previous testimonial"
        className="grid size-10 place-items-center bg-novatek-primary text-white transition-colors hover:bg-novatek-bg"
        type="button"
      >
        <ArrowGlyph className="rotate-180" />
      </button>
      <button
        aria-label="Next testimonial"
        className="grid size-10 place-items-center bg-novatek-primary text-white transition-colors hover:bg-novatek-bg"
        type="button"
      >
        <ArrowGlyph />
      </button>
    </div>
  )
}

function BackgroundVectors() {
  return (
    <svg
      className="pointer-events-none absolute -left-[710px] -top-[140px]"
      width="806"
      height="775"
      viewBox="0 0 806 775"
      fill="none"
      aria-hidden="true"
    >
      <g opacity="0.2" filter="url(#testimonial-bg-filter-0)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M184.822 478.75C222.052 477.279 245.805 514.01 275.576 536.415C314.31 565.564 373.202 579.504 382.041 627.168C391.345 677.344 358.869 730.218 316.895 759.241C279.231 785.283 229.642 772.91 184.822 763.536C150.971 756.455 126.269 734.083 98.4405 713.55C61.9235 686.606 -0.668312 672.545 0.00539423 627.168C0.680547 581.694 65.5078 571.791 100.968 543.314C129.562 520.352 148.178 480.198 184.822 478.75Z"
          fill="#7E8466"
        />
      </g>
      <g filter="url(#testimonial-bg-filter-1)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M606.203 0.042871C643.433 -1.42825 667.185 35.3029 696.956 57.7072C735.691 86.8568 794.583 100.796 803.422 148.461C812.726 198.636 780.25 251.51 738.276 280.533C700.612 306.576 651.023 294.203 606.203 284.828C572.352 277.748 547.649 255.375 519.821 234.842C483.304 207.898 420.713 193.837 421.386 148.461C422.061 102.987 486.889 93.0831 522.349 64.6067C550.943 41.6444 569.559 1.49082 606.203 0.042871Z"
          fill="#7E8466"
        />
      </g>
      <defs>
        <filter
          id="testimonial-bg-filter-0"
          x="-120"
          y="358.708"
          width="623.643"
          height="536.128"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="60" result="effect1_foregroundBlur_267_1408" />
        </filter>
        <filter
          id="testimonial-bg-filter-1"
          x="121.381"
          y="-300"
          width="983.643"
          height="896.128"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="150" result="effect1_foregroundBlur_267_1408" />
        </filter>
      </defs>
    </svg>
  )
}

export function TestimonialsSection({
  author,
  avatars,
  badge,
  eyebrow,
  quote,
  role,
  title,
}: TestimonialsSectionProps) {
  return (
    <section
      className="overflow-hidden bg-novatek-bg px-[clamp(20px,5.1vw,74px)] py-[74px] text-white max-md:px-6 max-md:pb-12 max-md:pt-[42px]"
      id="testimonials"
    >
      <div className="mx-auto grid max-w-content gap-12 max-md:gap-8">
        <div className="max-md:text-center">
          <p className="mb-4 text-lg font-medium leading-[26px] text-white">// {eyebrow} //</p>
          <h2 className="max-w-[681px] text-[48px] font-semibold leading-[60px] tracking-normal text-white max-md:mx-auto max-md:text-[32px] max-md:leading-10 [&_span]:text-novatek-primary">
            <HighlightedTitle {...title} />
          </h2>
        </div>
        <div className="grid grid-cols-[450px_minmax(0,1fr)] gap-[30px] max-lg:grid-cols-1">
          <aside className="relative flex min-h-[516px] overflow-hidden border border-white/10 bg-[radial-gradient(circle_at_76%_32%,rgba(126,132,102,0.24),rgba(21,21,21,0.78)_42%,#151515_78%)] p-8 max-md:min-h-0 max-md:p-6">
            <div className="relative flex w-full max-w-[330px] flex-col justify-between max-md:justify-start max-md:gap-[98px]">
              <div className="grid gap-[3px]">
                <TestimonialLogo />
              </div>
              <div>
                <div className="relative mb-4 h-[38px] w-[81px]">
                  <b className="absolute left-px top-0 text-[32px] font-semibold leading-10 text-white">
                    4.9
                  </b>
                  <span className="absolute left-[51px] top-[15px] text-sm font-semibold leading-[18px] text-novatek-muted">
                    /5.0
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex shrink-0">
                    {avatars.map((avatar, index) => (
                      <span
                        className={`grid size-[54px] place-items-center rounded-[5px] bg-white max-md:size-9 ${
                          index > 0 ? '-ml-[19px] max-md:-ml-[13px]' : ''
                        }`}
                        key={avatar}
                      >
                        <img
                          className="size-[50px] rounded-[5px] object-cover max-md:size-[33px]"
                          src={avatar}
                          alt=""
                        />
                      </span>
                    ))}
                  </div>
                  <div className="grid w-[161px] gap-1">
                    <GradientStars
                      height={15}
                      prefix="rating-stars"
                      viewBox="0 0 90 15"
                      width={90}
                    />
                    <p className="text-sm font-semibold leading-[18px] text-novatek-muted">
                      {badge}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
          <div className="grid min-h-[491px] grid-rows-[1fr_auto] gap-[29px] max-md:min-h-0 max-md:gap-6">
            <article className="relative flex min-h-[441px] flex-col justify-between overflow-hidden bg-novatek-soft p-[30px] text-novatek-bg max-md:min-h-[386px]">
              <div className="pointer-events-none absolute inset-y-0 left-0 w-28 bg-[linear-gradient(90deg,rgba(126,132,102,0.18),rgba(246,246,246,0))]" />
              <div className="relative max-w-[720px]">
                <GradientStars
                  className="mb-5"
                  height={20}
                  prefix="testimonial-stars"
                  viewBox="0 0 115 20"
                  width={115}
                />
                <p className="text-lg font-medium leading-[23px] text-novatek-bg">{quote}</p>
              </div>
              <footer className="relative">
                <h3 className="text-[28px] font-semibold leading-[31px] text-novatek-bg">
                  {author}
                </h3>
                <p className="mt-2.5 text-sm font-medium leading-[23px] text-novatek-muted">
                  {role}
                </p>
              </footer>
            </article>
            <div className="flex items-center gap-8">
              <div className="h-px flex-1 bg-[#D1D1D1]" />
              <TestimonialNav />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
