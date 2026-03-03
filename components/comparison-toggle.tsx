"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowLeftRight,
  Cpu,
  Brain,
  Gauge,
  Lock,
  Globe,
  Zap,
  Code,
  Network,
  Timer,
  ShieldCheck,
  Sparkles,
} from "lucide-react"

type ViewMode = "side-by-side" | "evm" | "genvm"

interface ComparisonCategory {
  title: string
  icon: React.ElementType
  evm: {
    label: string
    description: string
    rating: number
  }
  genvm: {
    label: string
    description: string
    rating: number
  }
}

const categories: ComparisonCategory[] = [
  {
    title: "Determinism",
    icon: Lock,
    evm: {
      label: "Fully Deterministic",
      description:
        "EVM executes bytecode deterministically. Every node produces the exact same result for the same input. This guarantees consistency but limits what contracts can do.",
      rating: 5,
    },
    genvm: {
      label: "Non-Deterministic by Design",
      description:
        "GenVM embraces non-determinism through LLM integration. Validators may produce different outputs, which is resolved through Optimistic Democracy consensus.",
      rating: 4,
    },
  },
  {
    title: "LLM Integration",
    icon: Brain,
    evm: {
      label: "No AI Capabilities",
      description:
        "EVM has no built-in support for AI or language models. Smart contracts cannot interpret natural language or make subjective decisions without external oracles.",
      rating: 1,
    },
    genvm: {
      label: "Native LLM Support",
      description:
        "GenVM natively integrates LLMs into the execution environment. Contracts can reason, understand natural language, and make complex AI-driven decisions on-chain.",
      rating: 5,
    },
  },
  {
    title: "Consensus Speed",
    icon: Gauge,
    evm: {
      label: "All Nodes Verify",
      description:
        "Every node in the network must re-execute every transaction to reach consensus. This creates strong security guarantees but limits throughput and speed.",
      rating: 3,
    },
    genvm: {
      label: "Optimistic Democracy",
      description:
        "Only 5 randomly selected validators process each transaction. A majority vote finalizes the result, with an appeal window for challenges. Faster and more scalable.",
      rating: 5,
    },
  },
  {
    title: "Web Access",
    icon: Globe,
    evm: {
      label: "Isolated Environment",
      description:
        "The EVM is completely isolated from the internet. External data requires trusted oracle services, adding cost, latency, and centralization risk.",
      rating: 1,
    },
    genvm: {
      label: "Internet-Connected",
      description:
        "Intelligent Contracts can directly access and reason about web data. No oracles needed for real-world information, enabling a new class of applications.",
      rating: 5,
    },
  },
  {
    title: "Contract Language",
    icon: Code,
    evm: {
      label: "Solidity / Vyper",
      description:
        "Requires learning specialized languages like Solidity. High barrier to entry and limited expressiveness for complex logic.",
      rating: 3,
    },
    genvm: {
      label: "Python + Natural Language",
      description:
        "Write Intelligent Contracts in Python with natural language instructions embedded. Lower barrier to entry and much greater expressiveness.",
      rating: 5,
    },
  },
]

function RatingBar({ value, maxValue = 5, color }: { value: number; maxValue?: number; color: "primary" | "accent" }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: maxValue }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: i * 0.05 + 0.2 }}
          className={`h-1.5 w-6 rounded-full ${
            i < value
              ? color === "primary"
                ? "bg-primary"
                : "bg-accent"
              : "bg-secondary"
          }`}
        />
      ))}
    </div>
  )
}

function ComparisonCard({
  category,
  side,
}: {
  category: ComparisonCategory
  side: "evm" | "genvm"
}) {
  const data = side === "evm" ? category.evm : category.genvm
  const Icon = category.icon
  const isGenvm = side === "genvm"

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`rounded-xl border p-5 transition-colors ${
        isGenvm
          ? "border-accent/30 bg-accent/5"
          : "border-border bg-card/50"
      }`}
    >
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className={`h-4 w-4 ${isGenvm ? "text-accent" : "text-muted-foreground"}`} />
          <span className="font-mono text-xs tracking-wider text-muted-foreground">
            {category.title.toUpperCase()}
          </span>
        </div>
        <RatingBar value={data.rating} color={isGenvm ? "accent" : "primary"} />
      </div>
      <h4 className={`mb-2 font-semibold ${isGenvm ? "text-accent" : "text-foreground"}`}>
        {data.label}
      </h4>
      <p className="text-sm leading-relaxed text-muted-foreground">{data.description}</p>
    </motion.div>
  )
}

export function ComparisonToggle() {
  const [mode, setMode] = useState<ViewMode>("side-by-side")

  return (
    <section id="compare" className="relative px-4 py-24">
      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 font-mono text-xs tracking-wider text-muted-foreground">
            <ArrowLeftRight className="h-3.5 w-3.5 text-primary" />
            COMPARISON DASHBOARD
          </div>
          <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            EVM vs GenVM
          </h2>
          <p className="mx-auto max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground">
            See how GenLayer's Intelligent Virtual Machine compares to the traditional
            Ethereum Virtual Machine across key dimensions.
          </p>
        </motion.div>

        {/* Toggle buttons */}
        <div className="mb-10 flex items-center justify-center">
          <div className="inline-flex rounded-lg border border-border bg-secondary/30 p-1">
            {[
              { key: "evm" as ViewMode, label: "EVM Only", icon: Cpu },
              { key: "side-by-side" as ViewMode, label: "Side by Side", icon: ArrowLeftRight },
              { key: "genvm" as ViewMode, label: "GenVM Only", icon: Sparkles },
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setMode(key)}
                className={`relative inline-flex items-center gap-2 rounded-md px-4 py-2 font-mono text-xs tracking-wider transition-colors ${
                  mode === key
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{label.toUpperCase()}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Summary cards */}
        <div className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {(mode === "side-by-side" || mode === "evm") && (
              <motion.div
                layout
                key="evm-summary"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`rounded-xl border border-border bg-card/50 p-6 ${
                  mode === "evm" ? "md:col-span-2" : ""
                }`}
              >
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                    <Cpu className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">EVM (Traditional)</h3>
                    <p className="font-mono text-xs text-muted-foreground">Ethereum Virtual Machine</p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  The industry-standard deterministic execution environment. Processes Solidity bytecode
                  identically across all nodes. Battle-tested but fundamentally limited in capabilities.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["Deterministic", "Isolated", "Solidity", "All-Node Verification"].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border bg-secondary/50 px-3 py-1 font-mono text-[10px] tracking-wider text-muted-foreground"
                    >
                      {tag.toUpperCase()}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            {(mode === "side-by-side" || mode === "genvm") && (
              <motion.div
                layout
                key="genvm-summary"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`rounded-xl border border-accent/30 bg-accent/5 p-6 ${
                  mode === "genvm" ? "md:col-span-2" : ""
                }`}
              >
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/15 glow-cyan">
                    <Sparkles className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-accent">GenVM (Intelligent)</h3>
                    <p className="font-mono text-xs text-muted-foreground">Generative Virtual Machine</p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  The next generation AI-powered execution environment. Natively integrates LLMs,
                  accesses the internet, and processes natural language for a new paradigm of smart contracts.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["AI-Native", "Web-Connected", "Python", "Optimistic Democracy"].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 font-mono text-[10px] tracking-wider text-accent/80"
                    >
                      {tag.toUpperCase()}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Detailed comparison */}
        <AnimatePresence mode="popLayout">
          {mode === "side-by-side" ? (
            <motion.div
              key="side-by-side"
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-4"
            >
              {categories.map((cat) => (
                <div key={cat.title} className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <ComparisonCard category={cat} side="evm" />
                  <ComparisonCard category={cat} side="genvm" />
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key={mode}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 gap-4 md:grid-cols-2"
            >
              {categories.map((cat) => (
                <ComparisonCard key={cat.title} category={cat} side={mode} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4"
        >
          {[
            { icon: Network, label: "Validators", evm: "All Nodes", genvm: "5 per TX" },
            { icon: Timer, label: "Consensus", evm: "Full Re-exec", genvm: "Majority Vote" },
            { icon: ShieldCheck, label: "Security", evm: "Deterministic", genvm: "Multi-LLM" },
            { icon: Zap, label: "AI Support", evm: "None", genvm: "Native" },
          ].map(({ icon: Icon, label, evm, genvm }) => (
            <div
              key={label}
              className="rounded-lg border border-border/50 bg-card/30 p-4 text-center"
            >
              <Icon className="mx-auto mb-2 h-5 w-5 text-primary/60" />
              <div className="mb-2 font-mono text-[10px] tracking-wider text-muted-foreground/60">
                {label.toUpperCase()}
              </div>
              <div className="flex items-center justify-center gap-2 font-mono text-xs">
                <span className="text-muted-foreground">{evm}</span>
                <span className="text-muted-foreground/30">{"/"}</span>
                <span className="text-accent">{genvm}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
