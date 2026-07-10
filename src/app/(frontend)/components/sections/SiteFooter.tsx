import type { NavItem, siteData } from '../../data'
import { serviceSlugs } from '../../content'
import { BrandLogo } from '../BrandLogo'
import { GridLines } from '../GridLines'
import { NovatekWordmark } from '../NovatekWordmark'

type SiteFooterProps = {
  brand: typeof siteData.brand
  nav: NavItem[]
  services: string[]
  footer: typeof siteData.footer
}

type SocialIconProps = {
  name: string
}

function SocialIcon({ name }: SocialIconProps) {
  if (name === 'Instagram') {
    return (
      <svg
        className="size-6 shrink-0"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6.11363 21.2237C7.33331 21.752 8.88887 21.752 12 21.752C15.1111 21.752 16.6667 21.752 17.8864 21.2237C19.3814 20.576 20.574 19.3835 21.2216 17.8884C21.75 16.6687 21.75 15.1131 21.75 12.002C21.75 8.89083 21.75 7.33526 21.2216 6.11558C20.574 4.62045 19.3814 3.42794 17.8864 2.78029C16.6667 2.25195 15.1111 2.25195 12 2.25195C8.88887 2.25195 7.33331 2.25195 6.11363 2.78029C4.6185 3.42794 3.42599 4.62045 2.77834 6.11558C2.25 7.33526 2.25 8.89083 2.25 12.002C2.25 15.1131 2.25 16.6687 2.77834 17.8884C3.42599 19.3835 4.6185 20.576 6.11363 21.2237ZM15.998 12.0026C15.998 14.2118 14.2072 16.0027 11.998 16.0027C9.7889 16.0027 7.99805 14.2118 7.99805 12.0026C7.99805 9.7935 9.7889 8.00264 11.998 8.00264C14.2072 8.00264 15.998 9.7935 15.998 12.0026ZM17.4989 7.50303C18.0511 7.50303 18.4988 7.05531 18.4988 6.50304C18.4988 5.95075 18.0511 5.50303 17.4989 5.50303C16.9465 5.50303 16.4988 5.95075 16.4988 6.50304C16.4988 7.05531 16.9465 7.50303 17.4989 7.50303Z"
          fill="#E5E5E5"
        />
      </svg>
    )
  }

  return (
    <svg
      className="size-6 shrink-0"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <g clipPath="url(#footer-tiktok-clip)">
        <path
          d="M12.526 0.0180563C13.8362 -0.00195305 15.1368 0.00845173 16.4366 -0.00195312C16.4799 1.62361 17.1394 3.08669 18.1887 4.17039L18.1871 4.16879C19.3164 5.18607 20.7859 5.84558 22.4058 5.95763L22.4282 5.95923V9.98991C20.8979 9.95149 19.4588 9.59853 18.1614 8.99184L18.2271 9.01906C17.5996 8.71732 17.0689 8.40757 16.5647 8.06181L16.6063 8.08902C16.5967 11.0096 16.6159 13.9301 16.5863 16.8403C16.5039 18.3234 16.0108 19.676 15.2201 20.8054L15.2361 20.7805C13.9139 22.6742 11.7721 23.9172 9.33652 23.9908H9.32532C9.22687 23.9956 9.11082 23.998 8.99396 23.998C7.60932 23.998 6.31511 23.6123 5.2122 22.9424L5.24421 22.9608C3.23688 21.753 1.85223 19.6864 1.59611 17.2829L1.59291 17.2501C1.5729 16.7499 1.56329 16.2496 1.5833 15.7598C1.97549 11.9348 5.18018 8.97584 9.0756 8.97584C9.5134 8.97584 9.94241 9.01345 10.3594 9.08469L10.3146 9.07828C10.3346 10.5582 10.2746 12.0389 10.2746 13.5188C9.936 13.3963 9.54542 13.3251 9.13803 13.3251C7.64293 13.3251 6.37114 14.2807 5.90052 15.6149L5.89332 15.6389C5.78687 15.9807 5.72524 16.3737 5.72524 16.7803C5.72524 16.9452 5.73564 17.1084 5.75485 17.2685L5.75325 17.2493C6.01897 18.8869 7.42283 20.1226 9.11562 20.1226C9.16444 20.1226 9.21246 20.1218 9.26049 20.1194H9.25328C10.4242 20.0842 11.4407 19.4543 12.0154 18.5235L12.0234 18.5091C12.2371 18.2113 12.3835 17.8512 12.4324 17.4598L12.4332 17.4486C12.5332 15.6582 12.4932 13.8781 12.5028 12.0877C12.5124 8.05701 12.4932 4.03593 12.5228 0.0156552L12.526 0.0180563Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="footer-tiktok-clip">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

function SocialLinks({ className, socials }: { className?: string; socials: string[] }) {
  return (
    <div className={`flex items-center gap-4 ${className ?? ''}`}>
      {socials.map((social) => (
        <a
          className="inline-flex items-center gap-2 text-lg font-medium leading-[1.45] text-white transition-colors hover:text-novatek-primary"
          href="#top"
          key={social}
        >
          <SocialIcon name={social} />
          {social}
        </a>
      ))}
    </div>
  )
}

function FooterGlow() {
  return (
    <svg
      className="pointer-events-none absolute left-1/2 top-[-70px] h-auto w-[1939px] -translate-x-1/2 opacity-80 max-md:top-[-48px] max-md:w-[1834px] max-md:-translate-x-[47%]"
      width="1939"
      height="968"
      viewBox="0 0 1939 968"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g opacity="0.1" filter="url(#footer-glow-left)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M377.538 363.141C453.588 360.136 502.107 435.167 562.92 480.933C642.043 540.477 762.344 568.951 780.398 666.316C799.404 768.81 733.064 876.816 647.324 936.102C570.388 989.299 469.093 964.024 377.538 944.874C308.39 930.412 257.93 884.711 201.085 842.768C126.492 787.729 -1.36517 759.007 0.0110188 666.316C1.39016 573.426 133.813 553.195 206.248 495.026C264.657 448.121 302.685 366.099 377.538 363.141Z"
          fill="#7E8466"
        />
      </g>
      <g opacity="0.5" filter="url(#footer-glow-right)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1592.67 0.0746053C1657.46 -2.48549 1698.8 61.4351 1750.6 100.424C1818.01 151.151 1920.5 175.408 1935.88 258.355C1952.07 345.672 1895.55 437.685 1822.51 488.192C1756.97 533.512 1670.67 511.979 1592.67 495.665C1533.76 483.344 1490.78 444.411 1442.35 408.679C1378.8 361.79 1269.88 337.321 1271.05 258.355C1272.23 179.22 1385.04 161.986 1446.75 112.43C1496.51 72.4706 1528.9 2.59437 1592.67 0.0746053Z"
          fill="#7E8466"
        />
      </g>
      <defs>
        <filter
          id="footer-glow-left"
          x="-120"
          y="243.054"
          width="1023.67"
          height="844.903"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="60" result="effect1_foregroundBlur" />
        </filter>
        <filter
          id="footer-glow-right"
          x="971.041"
          y="-300"
          width="1267.62"
          height="1115.33"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="150" result="effect2_foregroundBlur" />
        </filter>
      </defs>
    </svg>
  )
}

export function SiteFooter({ brand, footer, nav, services }: SiteFooterProps) {
  const mainLinks = nav.some((item) => item.label === 'Home')
    ? nav
    : [{ label: 'Home', href: '/' }, ...nav]

  return (
    <footer
      className="relative overflow-hidden border-t border-white/15 bg-novatek-bg px-[clamp(24px,5.14vw,74px)] pt-[74px] max-md:pt-12"
      id="contacts"
    >
      <GridLines height={973} opacity={0.05} />
      <FooterGlow />
      <div className="relative mx-auto flex max-w-content flex-col">
        <div className="flex items-start justify-between gap-8 max-lg:flex-col max-md:gap-8">
          <div className="flex w-full max-w-[328px] flex-col items-start gap-8 max-md:max-w-none max-md:gap-6">
            <div className="flex w-full flex-col items-start gap-6 max-md:gap-4">
              <BrandLogo compactOnMobile={false} name={brand.name} tagline={brand.tagline} />
              <p className="max-w-[328px] text-lg font-medium leading-[1.45] text-novatek-muted max-md:max-w-none">
                {footer.tagline}
              </p>
            </div>
            <SocialLinks className="hidden max-md:flex" socials={footer.socials} />
            <img
              className="aspect-[75/34] w-full max-w-[328px] object-cover opacity-90 max-md:max-w-none"
              src={footer.mapImage}
              alt=""
            />
          </div>

          <div className="grid w-full max-w-[730px] grid-cols-[168px_174px_348px] items-start gap-x-5 gap-y-8 max-md:max-w-none max-md:grid-cols-1 max-md:gap-6">
            <div className="flex w-[168px] flex-col items-start gap-6 max-md:w-full">
              <h3 className="text-[26px] font-semibold leading-[1.45] text-white">Main links</h3>
              <div className="flex flex-col items-start gap-4 self-stretch">
                {mainLinks.map((item, index) => (
                  <a
                    className={`text-lg font-medium leading-[1.45] transition-colors hover:text-novatek-primary ${
                      index === 0 ? 'text-novatek-primary' : 'text-novatek-muted'
                    }`}
                    href={item.href}
                    key={item.label}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-start gap-6">
              <h3 className="text-[26px] font-semibold leading-[1.45] text-white">Services</h3>
              <div className="flex flex-col items-start gap-4">
                {services.map((service) => (
                  <a
                    className="text-lg font-medium leading-[1.45] text-novatek-muted transition-colors hover:text-novatek-primary"
                    href={`/services/${serviceSlugs[service]}`}
                    key={service}
                  >
                    {service}
                  </a>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-start gap-6">
              <h3 className="text-[26px] font-semibold leading-[1.45] text-white">Contact info</h3>
              <div className="flex flex-col items-start gap-4 self-stretch">
                {[footer.contact[2], footer.contact[0], footer.contact[1]].map((line) => (
                  <span
                    className="text-lg font-medium leading-[1.45] text-novatek-muted"
                    key={line}
                  >
                    {line}
                  </span>
                ))}
              </div>
            </div>

            <a
              className="hidden text-lg font-medium leading-[1.45] text-white transition-colors hover:text-novatek-primary max-md:inline-flex"
              href="/privacy-policy"
            >
              Privacy Policy
            </a>
          </div>
        </div>

        <div className="mt-16 flex items-center justify-between gap-4 max-md:mt-8 max-md:justify-center">
          <a
            className="w-[212px] text-lg font-medium leading-[1.45] text-white transition-colors hover:text-novatek-primary max-md:hidden"
            href="/privacy-policy"
          >
            Privacy Policy
          </a>
          <p className="text-center text-lg font-medium leading-[1.45] text-white">
            {footer.copyright}
          </p>
          <SocialLinks className="justify-end max-md:hidden" socials={footer.socials} />
        </div>

        <NovatekWordmark className="-mb-[8.75%] mt-16 h-auto w-full opacity-[0.04] max-md:mt-8" />
      </div>
    </footer>
  )
}
