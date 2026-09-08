import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-background">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-20">
        <div className="flex flex-col gap-6">
          <span className="inline-flex w-fit items-center rounded-full bg-secondary px-3 py-1 text-xs font-medium tracking-wide text-secondary-foreground uppercase">
            Fall Collection · 2026
          </span>
          <h1 className="text-balance font-serif text-5xl leading-[1.05] tracking-tight text-foreground italic sm:text-6xl lg:text-6xl">
            Everyday goods, elevated.
          </h1>
          <p className="max-w-md text-pretty text-base leading-relaxed text-muted-foreground">
            Aro curates the essentials worth owning — thoughtfully made
            electronics, apparel, and home goods, chosen for how they hold up
            over time.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button
              size="lg"
              nativeButton={false}
              render={<Link href="/products" />}
            >
              Shop New Arrivals
              <ArrowRight data-icon="inline-end" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              render={<Link href="#categories" />}
            >
              Browse Categories
            </Button>
          </div>
          <dl className="mt-4 grid grid-cols-3 gap-6 border-t border-border pt-6">
            <div>
              <dt className="text-xs text-muted-foreground">Curated brands</dt>
              <dd className="font-serif text-2xl text-foreground">120+</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Happy customers</dt>
              <dd className="font-serif text-2xl text-foreground">48k</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Avg. rating</dt>
              <dd className="font-serif text-2xl text-foreground">4.8</dd>
            </div>
          </dl>
        </div>

        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-muted lg:aspect-[5/6]">
          <Image
            src="/images/hero-banner.png"
            alt="Curated collection of premium lifestyle products including headphones, a watch, and skincare arranged on a table"
            fill
            priority
            className="object-cover"
            crossOrigin="anonymous"
          />
        </div>
      </div>
    </section>
  )
}
