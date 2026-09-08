'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function OrderSuccess() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center justify-center rounded-2xl border bg-card p-12 text-center shadow-lg max-w-lg mx-auto"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 300, damping: 20 }}
        className="relative mb-6"
      >
        <motion.div 
          className="absolute inset-0 rounded-full bg-green-500/20"
          initial={{ scale: 0 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{ delay: 0.4, duration: 1.5, ease: "easeOut", repeat: Infinity, repeatDelay: 1 }}
        />
        <CheckCircle2 className="size-24 text-green-500 relative z-10" />
      </motion.div>
      <h2 className="mb-3 text-4xl font-bold font-serif tracking-tight">Order Confirmed!</h2>
      <p className="mb-10 text-lg text-muted-foreground leading-relaxed">
        Thank you for shopping with ShopEase.
      </p>
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Link href="#">
          <Button variant="outline" size="lg">
            View Order
          </Button>
        </Link>
        <Link href="/products">
          <Button size="lg">
            <ShoppingBag className="mr-2 size-4" />
            Continue Shopping
          </Button>
        </Link>
      </div>
    </motion.div>
  )
}
