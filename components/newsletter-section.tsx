import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function NewsletterSection() {
  return (
    <section id="about" className="bg-primary">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-5 px-4 py-16 text-center sm:px-6 lg:px-8">
        <h2 className="max-w-lg text-balance font-serif text-3xl italic text-primary-foreground sm:text-4xl">
          Get first access to new drops
        </h2>
        <p className="max-w-md text-pretty text-sm leading-relaxed text-primary-foreground/80">
          Join our list for early access to new arrivals, restocks, and
          member-only pricing. No spam, unsubscribe anytime.
        </p>
        <form className="flex w-full max-w-md flex-col gap-2 pt-2 sm:flex-row">
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <Input
            id="newsletter-email"
            type="email"
            required
            placeholder="you@example.com"
            className="h-10 bg-primary-foreground/95 text-foreground placeholder:text-muted-foreground"
          />
          <Button
            type="submit"
            size="lg"
            variant="secondary"
            className="shrink-0"
          >
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  )
}
