import { SiteHeader } from '@/components/site-header'
import { HeroSection } from '@/components/hero-section'
import { CategorySection } from '@/components/category-section'
import { FeaturedProductsSection } from '@/components/featured-products-section'
import { PromoBanner } from '@/components/promo-banner'
import { TestimonialsSection } from '@/components/testimonials-section'
import { NewsletterSection } from '@/components/newsletter-section'
import { SiteFooter } from '@/components/site-footer'

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col">
      <SiteHeader />
      <HeroSection />
      <CategorySection />
      <FeaturedProductsSection />
      <PromoBanner />
      <TestimonialsSection />
      <NewsletterSection />
      <SiteFooter />
    </main>
  )
}
