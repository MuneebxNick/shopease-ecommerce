'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 20, filter: 'blur(5px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.5, type: 'spring', bounce: 0, ease: 'easeOut' }}
      className="flex min-h-screen flex-col"
    >
      {children}
    </motion.div>
  )
}
