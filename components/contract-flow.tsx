"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  User,
  Send,
  Cpu,
  Brain,
  Vote,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  Globe,
} from "lucide-react"
import Image from "next/image"

interface FlowStep {
  id: number
  title: string
  subtitle: string
  icon: React.ElementType
  description: string
  details: string[]
  color: "primary" | "accent"
}

const steps: FlowStep[] = [
  {
    id: 1,
    title: "User Input",
    subtitle: "Transaction Submitted",
    icon: User,
    description:
      "A user creates and submits a transaction to the GenLayer network. Unlike traditional smart contracts, Intelligent Contracts can accept natural language instructions.",
    details: [
      "Transaction includes natural language or code instructions",
      "Sent to the GenLayer network via RPC",
      "Can reference external web data sources",
      "Supports complex, subjective task definitions",
    ],
    color: "primary",
  },
  {
    id: 2,
    title: "GenVM Execution",
    subtitle: "LLM-Driven Processing",
    icon: Brain,
    description:
      "The GenVM (Generative Virtual Machine) processes the transaction using integrated LLM capabilities. It can access the internet, reason about data, and execute AI-powered logic.",
    details: [
      "Leader validator processes the transaction first",
      "LLM interprets natural language instructions",
      "Can fetch and analyze real-world web data",
      "Produces a proposed output with reasoning",
    ],
    color: "accent",
  },
  {
    id: 3,
    title: "Validator Consensus",
    subtitle: "Multi-LLM Verification",
    icon: Vote,
    description:
      "Four additional validators, each connected to a different LLM, independently process the same transaction and compare their results to the leader's proposed output.",
    details: [
      "5 validators total (1 leader + 4 verifiers)",
      "Each validator uses a different LLM model",
      "Independent execution ensures diverse reasoning",
      "Validators compare outputs for agreement",
    ],
    color: "primary",
  },
  {
    id: 4,
    title: "Optimistic Democracy",
    subtitle: "Consensus Achieved",
    icon: CheckCircle2,
    description:
      "If a majority of validators agree with the leader's output, the transaction is finalized. If not, a new leader is chosen. An appeal window allows anyone to challenge the result.",
    details: [
      "Majority vote determines transaction acceptance",
      "Disagreement triggers new leader selection",
      "Appeal window for community challenges",
      "Bond-based appeal doubles the validator set",
    ],
    color: "accent",
  },
]

export function ContractFlow() {
  const [activeStep, setActiveStep] = useState(0)
  const [direction, setDirection] = useState(0)

  const goToStep = (index: number) => {
    setDirection(index > activeStep ? 1 : -1)
    setActiveStep(index)
  }

  const next = () => {
    if (activeStep < steps.length - 1) {
      setDirection(1)
      setActiveStep(activeStep + 1)
    }
  }

  const prev = () => {
    if (activeStep > 0) {
      setDirection(-1)
      setActiveStep(activeStep - 1)
    }
  }

  const reset = () => {
    setDirection(-1)
    setActiveStep(0)
  }

  const step = steps[activeStep]

  return (
    <section id="flow" className="relative px-4 py-24">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-20" />
      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 font-mono text-xs tracking-wider text-muted-foreground">
            <Cpu className="h-3.5 w-3.5 text-primary" />
            TRANSACTION LIFECYCLE
          </div>
          <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            The Intelligent Contract Flow
          </h2>
          <p className="mx-auto max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground">
            Follow a GenLayer transaction from submission to consensus. Each step
            demonstrates the power of AI-driven decentralized execution.
          </p>
        </motion.div>

        {/* Progress bar */}
        <div className="mb-12">
          <div className="flex items-center justify-center gap-2 md:gap-4">
            {steps.map((s, i) => {
              const Icon = s.icon
              const isActive = i === activeStep
              const isDone = i < activeStep
              return (
                <button
                  key={s.id}
                  onClick={() => goToStep(i)}
                  className="group flex flex-col items-center gap-2"
                  aria-label={`Go to step ${i + 1}: ${s.title}`}
                >
                  <div className="flex items-center gap-1 md:gap-2">
                    <motion.div
                      animate={{
                        scale: isActive ? 1.1 : 1,
                        borderColor: isActive
                          ? "oklch(0.65 0.25 290)"
                          : isDone
                          ? "oklch(0.70 0.20 180)"
                          : "oklch(0.28 0.04 290)",
                      }}
                      className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors md:h-12 md:w-12 ${
                        isActive
                          ? "bg-primary/20 glow-purple-sm"
                          : isDone
                          ? "bg-accent/20"
                          : "bg-secondary/50"
                      }`}
                    >
                      <Icon
                        className={`h-4 w-4 md:h-5 md:w-5 ${
                          isActive
                            ? "text-primary"
                            : isDone
                            ? "text-accent"
                            : "text-muted-foreground"
                        }`}
                      />
                    </motion.div>
                    {i < steps.length - 1 && (
                      <div className="hidden w-8 md:block lg:w-16">
                        <div className="h-px w-full bg-border" />
                      </div>
                    )}
                  </div>
                  <span
                    className={`hidden font-mono text-[10px] tracking-wider md:block ${
                      isActive ? "text-primary" : "text-muted-foreground/60"
                    }`}
                  >
                    {s.title.toUpperCase()}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Content card */}
        <div className="relative mx-auto min-h-[420px] max-w-4xl overflow-hidden rounded-xl border border-border bg-card/80 backdrop-blur-sm">
          {/* Card header */}
          <div className="flex items-center justify-between border-b border-border/50 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-destructive/60" />
                <span className="h-2.5 w-2.5 rounded-full bg-chart-3/60" />
                <span className="h-2.5 w-2.5 rounded-full bg-accent/60" />
              </div>
              <span className="font-mono text-xs text-muted-foreground">
                step_{activeStep + 1}.glayer
              </span>
            </div>
            <span className="font-mono text-xs text-muted-foreground/50">
              {activeStep + 1}/{steps.length}
            </span>
          </div>

          {/* Card content */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeStep}
              custom={direction}
              initial={{ x: direction > 0 ? 80 : -80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: direction > 0 ? -80 : 80, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="p-6 md:p-8"
            >
              <div className="flex flex-col gap-6 lg:flex-row lg:gap-10">
                {/* Left: info */}
                <div className="flex-1">
                  <div className="mb-4 flex items-center gap-3">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                        step.color === "primary"
                          ? "bg-primary/15 glow-purple-sm"
                          : "bg-accent/15 glow-cyan"
                      }`}
                    >
                      <step.icon
                        className={`h-6 w-6 ${
                          step.color === "primary" ? "text-primary" : "text-accent"
                        }`}
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">{step.title}</h3>
                      <p className="font-mono text-xs text-muted-foreground">
                        {step.subtitle}
                      </p>
                    </div>
                  </div>
                  <p className="mb-6 leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>

                {/* Right: details list */}
                <div className="flex-1">
                  <div className="rounded-lg border border-border/50 bg-secondary/30 p-5">
                    <h4 className="mb-4 font-mono text-xs font-semibold tracking-wider text-foreground">
                      KEY DETAILS
                    </h4>
                    <ul className="flex flex-col gap-3">
                      {step.details.map((detail, i) => (
                        <motion.li
                          key={detail}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 + 0.2 }}
                          className="flex items-start gap-3"
                        >
                          <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                          <span className="text-sm leading-relaxed text-muted-foreground">
                            {detail}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Card footer / navigation */}
          <div className="flex items-center justify-between border-t border-border/50 px-6 py-4">
            <button
              onClick={prev}
              disabled={activeStep === 0}
              className="inline-flex items-center gap-2 rounded-md px-4 py-2 font-mono text-xs tracking-wider text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground disabled:opacity-30 disabled:hover:bg-transparent"
            >
              <ChevronLeft className="h-4 w-4" />
              PREV
            </button>

            <button
              onClick={reset}
              className="inline-flex items-center gap-1 rounded-md px-3 py-2 font-mono text-[10px] tracking-wider text-muted-foreground/50 transition-colors hover:text-primary"
              aria-label="Reset to step 1"
            >
              <RotateCcw className="h-3 w-3" />
              RESET
            </button>

            <button
              onClick={next}
              disabled={activeStep === steps.length - 1}
              className="inline-flex items-center gap-2 rounded-md bg-primary/10 px-4 py-2 font-mono text-xs tracking-wider text-primary transition-colors hover:bg-primary/20 disabled:opacity-30 disabled:hover:bg-primary/10"
            >
              NEXT
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Architecture note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 flex items-center justify-center gap-3 text-center"
        >
          <Image
            src="/images/mochi-cookie.png"
            alt="Mochi with a cookie"
            width={32}
            height={32}
            className="h-8 w-8"
          />
          <span className="font-mono text-xs text-muted-foreground/50">
            GenLayer connects smart contracts directly to the internet and AI models
          </span>
        </motion.div>
      </div>
    </section>
  )
}
