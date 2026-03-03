"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Cpu, Menu, X } from "lucide-react"

const navItems = [
  { label: "Flow", href: "#flow" },
  { label: "Compare", href: "#compare" },
  { label: "Quiz", href: "#quiz" },
]

export function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        <a href="#" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20 glow-purple-sm">
            <Cpu className="h-4 w-4 text-primary" />
          </div>
          <span className="font-mono text-sm font-bold tracking-wider text-foreground">
            GENLAYER<span className="text-primary">.academy</span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="rounded-md px-4 py-2 font-mono text-xs tracking-wider text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {item.label.toUpperCase()}
            </a>
          ))}
        </nav>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground md:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-border/50 bg-background/95 backdrop-blur-xl md:hidden"
          >
            <nav className="flex flex-col px-4 py-2">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-md px-4 py-3 font-mono text-sm tracking-wider text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  {item.label.toUpperCase()}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
