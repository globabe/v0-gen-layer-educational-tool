"use client"

import { motion } from "framer-motion"
import { ArrowDown, Zap, Brain, Shield } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pt-16">
      {/* Background grid */}
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />
      {/* Radial glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 font-mono text-xs tracking-wider text-muted-foreground">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
            INTERACTIVE LEARNING PLATFORM
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-6 text-balance text-4xl font-bold leading-tight tracking-tight text-foreground md:text-6xl lg:text-7xl"
        >
          The Intelligence Layer
          <br />
          <span className="text-glow-purple text-primary">of the Internet</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mx-auto mb-10 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg"
        >
          Explore GenLayer, the first intelligent blockchain. Learn how AI-powered
          Intelligent Contracts, GenVM, and Optimistic Democracy consensus are
          redefining decentralized applications.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-16 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#flow"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-mono text-xs font-semibold tracking-wider text-primary-foreground transition-all hover:bg-primary/90 glow-purple"
          >
            <Zap className="h-4 w-4" />
            START LEARNING
          </a>
          <a
            href="#quiz"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary/50 px-6 py-3 font-mono text-xs font-semibold tracking-wider text-foreground transition-all hover:bg-secondary"
          >
            <Brain className="h-4 w-4" />
            TAKE THE QUIZ
          </a>
        </motion.div>

        {/* Feature pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          {[
            { icon: Brain, label: "AI-Powered Contracts" },
            { icon: Zap, label: "GenVM Execution" },
            { icon: Shield, label: "Optimistic Democracy" },
          ].map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 rounded-full border border-border/50 bg-card/50 px-4 py-2 backdrop-blur-sm"
            >
              <Icon className="h-3.5 w-3.5 text-primary" />
              <span className="font-mono text-xs text-muted-foreground">{label}</span>
            </div>
          ))}
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-16"
        >
          <a href="#flow" className="inline-flex flex-col items-center gap-2 text-muted-foreground/50 transition-colors hover:text-primary">
            <span className="font-mono text-[10px] tracking-widest">SCROLL TO EXPLORE</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowDown className="h-4 w-4" />
            </motion.div>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
