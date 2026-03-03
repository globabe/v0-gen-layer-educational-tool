"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Send,
  Crown,
  BrainCircuit,
  Timer,
  CheckCheck,
  ChevronDown,
  ChevronUp,
} from "lucide-react"

interface TimelineStep {
  number: number
  title: string
  subtitle: string
  icon: React.ElementType
  description: string
  details: string[]
}

const steps: TimelineStep[] = [
  {
    number: 1,
    title: "Submission",
    subtitle: "User sends a transaction",
    icon: Send,
    description:
      "A user submits a transaction to a GenLayer Intelligent Contract. This could be a natural-language request, a function call, or any interaction that requires AI reasoning.",
    details: [
      "Transaction is broadcast to the GenLayer network",
      "The Intelligent Contract receives the call with its parameters",
      "A random set of 5 validators is selected to process the transaction",
    ],
  },
  {
    number: 2,
    title: "Leader Proposal",
    subtitle: "A random validator proposes an outcome",
    icon: Crown,
    description:
      "One validator is randomly chosen as the Leader. The Leader runs the Intelligent Contract on GenVM, using an LLM to execute the non-deterministic logic, and proposes the result.",
    details: [
      "The Leader executes the contract using GenVM with an integrated LLM",
      "Non-deterministic logic (web access, AI reasoning) produces a proposed outcome",
      "The proposed result is shared with the remaining co-validators",
    ],
  },
  {
    number: 3,
    title: "Neural Consensus",
    subtitle: "Co-validators verify via the Equivalence Principle",
    icon: BrainCircuit,
    description:
      "The 4 co-validators independently execute the contract and use the Equivalence Principle -- they don't check for identical outputs, but rather if their result is 'equivalent in meaning' to the Leader's proposal.",
    details: [
      "Each co-validator runs the contract independently on GenVM",
      "LLMs compare their own result against the Leader's proposed output",
      "A majority vote (3 of 5) determines if the proposal is accepted or rejected",
    ],
  },
  {
    number: 4,
    title: "Finality Window",
    subtitle: "An appeal period opens for disputes",
    icon: Timer,
    description:
      "After the validators reach consensus, an appeal window opens. During this period, anyone can challenge the result by staking tokens and triggering a re-evaluation by a larger jury.",
    details: [
      "A configurable time window opens for potential appeals",
      "Any network participant can stake tokens to dispute the outcome",
      "If appealed, a new larger set of validators is summoned for re-evaluation",
    ],
  },
  {
    number: 5,
    title: "Resolution",
    subtitle: "State is finalized or appealed",
    icon: CheckCheck,
    description:
      "If no appeal is filed within the finality window, the transaction is finalized and the blockchain state is updated. If appealed, the larger jury re-processes the transaction for a final binding decision.",
    details: [
      "No appeal: state is permanently updated on the GenLayer chain",
      "Appealed: a larger jury re-executes and produces a binding final result",
      "Malicious validators lose their stake; honest ones are rewarded",
    ],
  },
]

function StepCard({
  step,
  index,
  isExpanded,
  onToggle,
}: {
  step: TimelineStep
  index: number
  isExpanded: boolean
  onToggle: () => void
}) {
  const Icon = step.icon
  const isLast = index === steps.length - 1

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="relative flex gap-4 md:gap-6"
    >
      {/* Timeline spine */}
      <div className="flex flex-col items-center">
        {/* Node */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-primary/40 bg-card md:h-12 md:w-12"
        >
          <Icon className="h-4 w-4 text-primary md:h-5 md:w-5" />
          {/* Step number badge */}
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground md:h-5 md:w-5 md:text-[10px]">
            {step.number}
          </span>
        </motion.div>
        {/* Connector line */}
        {!isLast && (
          <div className="w-px flex-1 bg-gradient-to-b from-primary/40 to-border/20" />
        )}
      </div>

      {/* Content card */}
      <div className={`flex-1 ${!isLast ? "pb-6 md:pb-8" : "pb-0"}`}>
        <button
          onClick={onToggle}
          className="group w-full rounded-xl border border-border/60 bg-card/40 p-4 text-left transition-all hover:border-primary/30 hover:bg-card/60 md:p-5"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <h4 className="text-sm font-bold text-foreground md:text-base">
                {step.title}
              </h4>
              <p className="mt-0.5 font-mono text-[11px] tracking-wider text-primary/70 md:text-xs">
                {step.subtitle}
              </p>
            </div>
            <div className="mt-1 flex-shrink-0 text-muted-foreground/50 transition-colors group-hover:text-primary">
              {isExpanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </div>
          </div>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground md:text-sm">
                  {step.description}
                </p>
                <ul className="mt-3 flex flex-col gap-2">
                  {step.details.map((detail) => (
                    <li key={detail} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-primary" />
                      <span className="text-xs leading-relaxed text-muted-foreground/80">
                        {detail}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.div>
  )
}

export function OptimisticDemocracyTimeline() {
  const [expanded, setExpanded] = useState<number | null>(0)

  return (
    <section id="democracy" className="relative px-4 py-24">
      <div className="relative z-10 mx-auto max-w-3xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 font-mono text-xs tracking-wider text-muted-foreground">
            <BrainCircuit className="h-3.5 w-3.5 text-primary" />
            CONSENSUS MECHANISM
          </div>
          <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Optimistic Democracy
          </h2>
          <p className="mx-auto max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground">
            GenLayer{"'"}s novel consensus protocol that resolves non-determinism
            through validator voting and an appeal-based finality window.
          </p>
        </motion.div>

        {/* Timeline steps */}
        <div className="flex flex-col">
          {steps.map((step, idx) => (
            <StepCard
              key={step.number}
              step={step}
              index={idx}
              isExpanded={expanded === idx}
              onToggle={() => setExpanded(expanded === idx ? null : idx)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
