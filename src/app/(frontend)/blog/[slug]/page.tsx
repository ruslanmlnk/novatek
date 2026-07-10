import { notFound } from 'next/navigation'

import { ArrowButton } from '../../components/ArrowButton'
import { BlogCard } from '../../components/BlogCard'
import { PageHero } from '../../components/PageHero'
import { SiteFooter } from '../../components/sections/SiteFooter'
import { blogPosts } from '../../content'
import { siteData } from '../../data'

type PageProps = {
  params: Promise<{ slug: string }>
}

const MONTHS: Record<string, string> = {
  Jan: 'January',
  Feb: 'February',
  Mar: 'March',
  Apr: 'April',
  May: 'May',
  Jun: 'June',
  Jul: 'July',
  Aug: 'August',
  Sep: 'September',
  Oct: 'October',
  Nov: 'November',
  Dec: 'December',
}

function formatLongDate(date: string) {
  const [day, month, year] = date.split(' ')
  return `${MONTHS[month] ?? month} ${day}, 20${year}`
}

const shareLinks = [
  {
    label: 'Share on Instagram',
    evenOdd: true,
    d: 'M4.75522 23.3497C6.25636 24 8.17089 24 12 24C15.829 24 17.7436 24 19.2447 23.3497C21.0848 22.5526 22.5525 21.0849 23.3496 19.2448C23.9999 17.7436 23.9999 15.8291 23.9999 12C23.9999 8.1709 23.9999 6.25636 23.3496 4.75522C22.5525 2.91507 21.0848 1.44737 19.2447 0.650258C17.7436 -4.40156e-08 15.829 0 12 0C8.17089 0 6.25636 -4.40156e-08 4.75522 0.650258C2.91507 1.44737 1.44737 2.91507 0.650258 4.75522C-4.40156e-08 6.25636 0 8.1709 0 12C0 15.8291 -4.40156e-08 17.7436 0.650258 19.2448C1.44737 21.0849 2.91507 22.5526 4.75522 23.3497ZM16.9206 12.0008C16.9206 14.7198 14.7165 16.9239 11.9976 16.9239C9.27862 16.9239 7.0745 14.7198 7.0745 12.0008C7.0745 9.28187 9.27862 7.07775 11.9976 7.07775C14.7165 7.07775 16.9206 9.28187 16.9206 12.0008ZM18.7678 6.46285C19.4475 6.46285 19.9985 5.91181 19.9985 5.23209C19.9985 4.55235 19.4475 4.00131 18.7678 4.00131C18.088 4.00131 17.5369 4.55235 17.5369 5.23209C17.5369 5.91181 18.088 6.46285 18.7678 6.46285Z',
  },
  {
    label: 'Share on Viber',
    d: 'M14.3994 -0.000244141H9.59931C4.96726 -0.000244141 1.19922 3.7678 1.19922 8.39984V11.9999C1.19891 13.59 1.64978 15.1476 2.49946 16.4917C3.34913 17.8357 4.56273 18.9112 5.99927 19.593V23.604C5.99927 23.952 6.43427 24.132 6.68028 23.886L10.1663 20.403H14.3994C19.0314 20.403 22.7994 16.6349 22.7994 11.9999V8.39984C22.7994 3.7678 19.0314 -0.000244141 14.3994 -0.000244141ZM17.5434 15.7442L16.3284 16.9322C15.0504 18.1832 11.7143 16.7552 8.7743 13.7522C5.83427 10.7462 4.54425 7.38013 5.75927 6.12912L6.97428 4.94111C7.42128 4.5031 8.18029 4.5121 8.6813 4.95911L10.4333 6.75013C11.0573 7.38913 10.7933 8.46014 9.96831 8.70615C9.3983 8.88915 9.0113 9.51616 9.1943 10.0862C9.49731 11.4182 11.1863 13.0832 12.4463 13.4132C13.0133 13.5452 13.6493 13.2362 13.8474 12.6692C14.1084 11.8502 15.1854 11.6072 15.8124 12.2492L17.5614 14.0372C17.9994 14.4839 17.9934 15.2432 17.5434 15.7442ZM13.0913 5.69982C12.9713 5.69982 12.8513 5.70582 12.7343 5.72082C12.5153 5.74482 12.3173 5.58581 12.2933 5.36681C12.2693 5.14781 12.4283 4.94981 12.6473 4.92581C12.7943 4.90781 12.9443 4.90181 13.0913 4.90181C15.2964 4.90181 17.0904 6.69583 17.0904 8.90085C17.0904 9.04785 17.0844 9.19785 17.0664 9.34485C17.0424 9.56086 16.8414 9.72286 16.6254 9.69886C16.4094 9.67486 16.2474 9.47386 16.2714 9.25785C16.2834 9.14085 16.2924 9.02085 16.2924 8.90085C16.2924 7.13683 14.8554 5.69982 13.0913 5.69982ZM15.4914 8.90085C15.4914 9.11985 15.3084 9.29985 15.0894 9.29985C14.8734 9.29985 14.6904 9.11985 14.6904 8.90085C14.6904 8.01884 13.9734 7.30183 13.0913 7.30183C12.8693 7.30183 12.6893 7.12183 12.6893 6.89983C12.6893 6.68083 12.8693 6.50082 13.0913 6.50082C14.4144 6.50082 15.4914 7.57783 15.4914 8.90085ZM18.5424 10.1939C18.4914 10.4099 18.2604 10.5449 18.0474 10.4879C17.8404 10.4309 17.7144 10.2149 17.7624 10.0079C17.8494 9.64786 17.8914 9.27585 17.8914 8.90085C17.8914 6.25482 15.7374 4.1008 13.0913 4.1008C12.9683 4.1008 12.8423 4.1038 12.7193 4.1158C12.5003 4.1308 12.3083 3.9658 12.2903 3.74679C12.2753 3.52479 12.4403 3.33279 12.6593 3.31779C12.8033 3.30579 12.9473 3.29979 13.0913 3.29979C16.1784 3.29979 18.6924 5.81382 18.6924 8.90085C18.6924 9.33585 18.6414 9.77086 18.5424 10.1939Z',
  },
  {
    label: 'Share on Telegram',
    d: 'M0.528793 11.856L6.04884 13.7305L19.1555 5.71791C19.3458 5.60219 19.5404 5.86019 19.3767 6.01105L9.45429 15.144L9.08572 20.2569C9.0797 20.3425 9.09986 20.428 9.14352 20.5019C9.18718 20.5758 9.25229 20.6347 9.3302 20.6708C9.40811 20.7069 9.49515 20.7184 9.57977 20.7039C9.66439 20.6894 9.7426 20.6495 9.80401 20.5895L12.8589 17.5851L18.4441 21.8126C19.0458 22.2686 19.9175 21.9472 20.0795 21.21L23.9684 3.55275C24.1904 2.54559 23.203 1.6953 22.2404 2.06388L0.501365 10.3885C-0.180927 10.6499 -0.162069 11.6211 0.528793 11.856Z',
  },
  {
    label: 'Share on WhatsApp',
    d: 'M12.003 0H11.997C5.3805 0 0 5.382 0 12C0 14.625 0.846 17.058 2.2845 19.0335L0.789 23.4915L5.4015 22.017C7.299 23.274 9.5625 24 12.003 24C18.6195 24 24 18.6165 24 12C24 5.3835 18.6195 0 12.003 0ZM18.9855 16.9455C18.696 17.763 17.547 18.441 16.6305 18.639C16.0035 18.7725 15.1845 18.879 12.4275 17.736C8.901 16.275 6.63 12.6915 6.453 12.459C6.2835 12.2265 5.028 10.5615 5.028 8.8395C5.028 7.1175 5.9025 6.279 6.255 5.919C6.5445 5.6235 7.023 5.4885 7.482 5.4885C7.6305 5.4885 7.764 5.496 7.884 5.502C8.2365 5.517 8.4135 5.538 8.646 6.0945C8.9355 6.792 9.6405 8.514 9.7245 8.691C9.81 8.868 9.8955 9.108 9.7755 9.3405C9.663 9.5805 9.564 9.687 9.387 9.891C9.21 10.095 9.042 10.251 8.865 10.47C8.703 10.6605 8.52 10.8645 8.724 11.217C8.928 11.562 9.633 12.7125 10.671 13.6365C12.0105 14.829 13.0965 15.21 13.485 15.372C13.7745 15.492 14.1195 15.4635 14.331 15.2385C14.5995 14.949 14.931 14.469 15.2685 13.9965C15.5085 13.6575 15.8115 13.6155 16.1295 13.7355C16.4535 13.848 18.168 14.6955 18.5205 14.871C18.873 15.048 19.1055 15.132 19.191 15.2805C19.275 15.429 19.275 16.1265 18.9855 16.9455Z',
  },
]

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const post = blogPosts.find((item) => item.slug === slug)

  return {
    description: post?.description ?? 'Engineering insights from Novatek Engineering.',
    title: post ? `${post.title} - Novatek Engineering` : 'Article - Novatek Engineering',
  }
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params
  const post = blogPosts.find((item) => item.slug === slug)

  if (!post) notFound()

  const relatedPosts = [...blogPosts.filter((item) => item.slug !== post.slug), post]

  return (
    <div className="min-h-screen overflow-hidden bg-novatek-bg" id="top">
      <PageHero
        activeHref="/blog"
        brand={siteData.brand}
        nav={siteData.nav}
        meta={
          <div className="flex flex-wrap items-center justify-center gap-4">
            <span className="bg-[linear-gradient(136deg,#C5D487_2.79%,#7E8466_95.83%)] px-4 py-2 text-lg font-medium leading-[1.45] text-white">
              {formatLongDate(post.date)}
            </span>
            <p className="text-lg font-medium leading-[1.45] text-white">// {post.category} //</p>
          </div>
        }
        title={post.title}
        description={post.description}
        gridLines
      />
      <section className="bg-novatek-bg px-[clamp(20px,5.1vw,74px)] pb-[74px] pt-[42px]">
        <div className="mx-auto grid max-w-content justify-items-center gap-12">
          <img
            className="aspect-[2/1] w-full max-w-[1012px] object-cover max-md:aspect-[3/2]"
            src={post.heroImage}
            alt=""
          />
          <div className="grid w-full max-w-[1012px] gap-8">
            <div className="grid gap-6">
              <div className="grid gap-4">
                <h2 className="text-[26px] font-semibold leading-[1.45] text-white">Overview:</h2>
                <p className="text-lg font-medium leading-[1.45] text-novatek-muted">
                  {post.article.overview}
                </p>
              </div>
              <ul className="grid gap-4">
                {post.article.keyPoints.map((point) => (
                  <li className="text-lg font-medium leading-[1.45] text-novatek-muted" key={point}>
                    {point}
                  </li>
                ))}
              </ul>
              <p className="text-lg font-medium leading-[1.45] text-novatek-muted">
                {post.article.details}
              </p>
            </div>
            <blockquote className="bg-[linear-gradient(136deg,#C5D487_2.79%,#7E8466_95.83%)] p-8 text-center text-lg font-medium leading-[1.45] text-white">
              &ldquo;{post.article.quote}&rdquo;
            </blockquote>
            <p className="text-lg font-medium leading-[1.45] text-novatek-muted">
              {post.article.conclusion}
            </p>
            <div className="flex items-center justify-between gap-8 border-t border-white/20 pt-8 max-md:flex-col max-md:items-start">
              <h2 className="text-[26px] font-semibold leading-[1.45] text-white">
                Share this article
              </h2>
              <div className="flex items-center gap-2">
                {shareLinks.map(({ label, d, evenOdd }) => (
                  <a
                    className="grid size-10 place-items-center bg-novatek-primary transition-opacity hover:opacity-90"
                    href="#"
                    aria-label={label}
                    key={label}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path
                        d={d}
                        fill="white"
                        fillRule={evenOdd ? 'evenodd' : undefined}
                        clipRule={evenOdd ? 'evenodd' : undefined}
                      />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-novatek-bg px-[clamp(20px,5.1vw,74px)] pb-[74px] pt-12">
        <div className="mx-auto grid max-w-content gap-12">
          <div className="grid gap-4">
            <p className="text-lg font-medium leading-[1.45] text-white">// Related Articles //</p>
            <div className="flex items-center justify-between gap-8 max-md:flex-col max-md:items-start">
              <h2 className="text-[clamp(34px,4vw,48px)] font-semibold leading-[1.25] text-white">
                More <span className="text-novatek-primary">articles</span>
              </h2>
              <ArrowButton href="/blog" label="View All Articles" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-8 max-lg:grid-cols-2 max-md:grid-cols-1">
            {relatedPosts.map((item) => (
              <BlogCard post={item} key={item.slug} />
            ))}
          </div>
        </div>
      </section>
      <SiteFooter
        brand={siteData.brand}
        footer={siteData.footer}
        nav={siteData.nav}
        services={siteData.services.items.map((service) => service.title)}
      />
    </div>
  )
}
