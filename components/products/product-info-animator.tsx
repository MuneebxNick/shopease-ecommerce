'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

export function ProductInfoAnimator({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col h-full"
    >
      {children}
    </motion.div>
  )
}
