import Link from 'next/link'
import { Separator } from '@/components/ui/separator'

const footerColumns = [
  {
    title: 'Shop',
    links: ['New Arrivals', 'Best Sellers', 'Deals', 'Gift Cards'],
  },
  {
    title: 'Support',
    links: ['Contact Us', 'Shipping & Returns', 'Size Guide', 'Track Order'],
  },
  {
    title: 'Company',
    links: ['About Aro', 'Careers', 'Press', 'Sustainability'],
  },
]

export function SiteFooter() {
  return (
    <footer className="bg-background">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div className="col-span-2 flex flex-col gap-3 sm:col-span-1">
            <span className="font-serif text-2xl italic text-foreground">
              Aro
            </span>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              Curated essentials for everyday life, chosen for quality that
              lasts.
            </p>
            <div className="mt-2 flex items-center gap-4">
              <Link
                href="#"
                className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Instagram
              </Link>
              <Link
                href="#"
                className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Twitter
              </Link>
            </div>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title} className="flex flex-col gap-3">
              <h3 className="text-sm font-medium text-foreground">
                {column.title}
              </h3>
              <ul className="flex flex-col gap-2">
                {column.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-10" />

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Aro. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link
              href="#"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
