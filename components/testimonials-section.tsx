import { Star } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

const testimonials = [
  {
    name: 'Zara Ahmed',
    role: 'Verified buyer',
    initials: 'ZA',
    quote:
      'The Aurora headphones are worth every penny. Packaging alone felt premium, and the sound quality has kept me from reaching for my old pair since.',
  },
  {
    name: 'Ali Hassan',
    role: 'Verified buyer',
    initials: 'AH',
    quote:
      'Ordered the Wayfare backpack for a work trip and it has held up beautifully through three flights. ShopEase is now my default for anything I plan to keep.',
  },
  {
    name: 'Fatima Khan',
    role: 'Verified buyer',
    initials: 'FK',
    quote:
      'Fast shipping, honest product photos, and a return process that took two minutes. Rare to find all three in one place.',
  },
]

export function TestimonialsSection() {
  return (
    <section className="border-b border-border bg-muted/40">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="font-serif text-3xl italic text-foreground">
            Loved by 48,000 customers
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <figure
              key={testimonial.name}
              className="flex flex-col gap-4 rounded-xl bg-card p-6 ring-1 ring-foreground/10"
            >
              <div className="flex gap-0.5" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-3.5 fill-accent text-accent" />
                ))}
              </div>
              <blockquote className="text-sm leading-relaxed text-foreground">
                {`"${testimonial.quote}"`}
              </blockquote>
              <figcaption className="mt-auto flex items-center gap-3 pt-2">
                <Avatar>
                  <AvatarFallback>{testimonial.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
