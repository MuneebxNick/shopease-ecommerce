import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function PromoBanner() {
  return (
    <section id="deals" className="border-b border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-primary">
          <div className="absolute inset-0">
            <Image
              src="/images/promo-banner.png"
              alt="Autumn accessories including a watch and sunglasses on a warm-toned surface"
              fill
              loading="eager"
              className="object-cover opacity-40"
              crossOrigin="anonymous"
            />
          </div>
          <div className="relative flex flex-col items-start gap-4 px-8 py-14 sm:px-12 lg:px-16 lg:py-20">
            <span className="inline-flex w-fit items-center rounded-full bg-accent px-3 py-1 text-xs font-medium tracking-wide text-accent-foreground uppercase">
              Limited time
            </span>
            <h2 className="max-w-lg text-balance font-serif text-4xl italic text-primary-foreground sm:text-5xl">
              Up to 30% off select accessories
            </h2>
            <p className="max-w-md text-pretty text-sm leading-relaxed text-primary-foreground/80">
              Watches, bags, and sunglasses from our most-loved brands. While
              supplies last.
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="mt-2"
              nativeButton={false}
              render={<Link href="#new-arrivals" />}
            >
              Shop the sale
              <ArrowRight data-icon="inline-end" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
