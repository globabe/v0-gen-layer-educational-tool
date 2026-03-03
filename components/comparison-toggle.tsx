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
  Code,
  Sparkles,
  Check,
  X,
  Minus,
} from "lucide-react"

type ViewMode = "table" | "evm" | "genvm"

interface ComparisonRow {
  category: string
  icon: React.ElementType
  evm: {
    value: string
    detail: string
    score: 1 | 2 | 3 | 4 | 5
  }
  genvm: {
    value: string
    detail: string
    score: 1 | 2 | 3 | 4 | 5
  }
}

const rows: ComparisonRow[] = [
  {
    category: "Determinism",
    icon: Lock,
    evm: {
      value: "Fully Deterministic",
      detail: "Every node produces identical results. Guarantees consistency but limits capabilities.",
      score: 5,
    },
    genvm: {
      value: "Non-Deterministic by Design",
      detail: "Embraces non-determinism via LLMs. Resolved through Optimistic Democracy consensus.",
      score: 4,
    },
  },
  {
    category: "LLM Integration",
    icon: Brain,
    evm: {
      value: "None",
      detail: "No built-in AI. Contracts cannot interpret natural language without external oracles.",
      score: 1,
    },
    genvm: {
      value: "Native LLM Support",
      detail: "LLMs integrated into execution. Contracts reason, understand language, and decide on-chain.",
      score: 5,
    },
  },
  {
    category: "Consensus Speed",
    icon: Gauge,
    evm: {
      value: "Full Re-execution",
      detail: "Every node re-executes every transaction. Strong security but limits throughput.",
      score: 3,
    },
    genvm: {
      value: "Optimistic Democracy",
      detail: "5 random validators per TX. Majority vote finalizes with appeal window. Much faster.",
      score: 5,
    },
  },
  {
    category: "Web Access",
    icon: Globe,
    evm: {
      value: "Isolated / Oracles Only",
      detail: "Completely isolated from the internet. External data needs costly, centralized oracles.",
      score: 1,
    },
    genvm: {
      value: "Internet-Connected",
      detail: "Contracts access and reason about web data directly. No oracles needed.",
      score: 5,
    },
  },
  {
    category: "Contract Language",
    icon: Code,
    evm: {
      value: "Solidity / Vyper",
      detail: "Specialized languages with steep learning curve and limited expressiveness.",
      score: 3,
    },
    genvm: {
      value: "Python + Natural Language",
      detail: "Write in Python with embedded natural language instructions. Much lower barrier.",
      score: 5,
    },
  },
]

function ScoreDots({ score, variant }: { score: number; variant: "evm" | "genvm" }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: i * 0.04 + 0.1 }}
          className={`h-2 w-2 rounded-full ${
            i < score
              ? variant === "genvm"
                ? "bg-accent"
                : "bg-primary/70"
              : "bg-secondary"
          }`}
        />
      ))}
    </div>
  )
}

function VerdictIcon({ score }: { score: number }) {
  if (score >= 4) return <Check className="h-4 w-4 text-emerald-400" />
  if (score >= 3) return <Minus className="h-4 w-4 text-amber-400" />
  return <X className="h-4 w-4 text-red-400" />
}

/* ---- Mobile card (shown < md) ---- */
function MobileRow({ row, mode }: { row: ComparisonRow; mode: ViewMode }) {
  const Icon = row.icon
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-border/60 bg-card/40 p-4"
    >
      <div className="mb-3 flex items-center gap-2">
        <Icon className="h-4 w-4 text-primary" />
        <span className="font-mono text-xs font-medium tracking-wider text-foreground">
          {row.category.toUpperCase()}
        </span>
      </div>

      {(mode === "table" || mode === "evm") && (
        <div className="mb-3 rounded-lg border border-border/40 bg-secondary/20 p-3">
          <div className="mb-1.5 flex items-center justify-between">
            <span className="font-mono text-[10px] tracking-widest text-muted-foreground/60">EVM</span>
            <ScoreDots score={row.evm.score} variant="evm" />
          </div>
          <p className="text-sm font-medium text-foreground/80">{row.evm.value}</p>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{row.evm.detail}</p>
        </div>
      )}

      {(mode === "table" || mode === "genvm") && (
        <div className="rounded-lg border border-accent/20 bg-accent/5 p-3">
          <div className="mb-1.5 flex items-center justify-between">
            <span className="font-mono text-[10px] tracking-widest text-accent/70">GENVM</span>
            <ScoreDots score={row.genvm.score} variant="genvm" />
          </div>
          <p className="text-sm font-medium text-accent">{row.genvm.value}</p>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{row.genvm.detail}</p>
        </div>
      )}
    </motion.div>
  )
}

export function ComparisonToggle() {
  const [mode, setMode] = useState<ViewMode>("table")
  const [hoveredRow, setHoveredRow] = useState<number | null>(null)

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
            See how GenLayer{"'"}s Intelligent Virtual Machine compares to the traditional
            Ethereum Virtual Machine across key dimensions.
          </p>
        </motion.div>

        {/* Toggle */}
        <div className="mb-10 flex items-center justify-center">
          <div className="inline-flex rounded-lg border border-border bg-secondary/30 p-1">
            {(
              [
                { key: "evm" as ViewMode, label: "EVM Only", icon: Cpu },
                { key: "table" as ViewMode, label: "Side by Side", icon: ArrowLeftRight },
                { key: "genvm" as ViewMode, label: "GenVM Only", icon: Sparkles },
              ] as const
            ).map(({ key, label, icon: BtnIcon }) => (
              <button
                key={key}
                onClick={() => setMode(key)}
                className={`relative inline-flex items-center gap-2 rounded-md px-4 py-2 font-mono text-xs tracking-wider transition-colors ${
                  mode === key
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <BtnIcon className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{label.toUpperCase()}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ===== DESKTOP TABLE (hidden on mobile) ===== */}
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="hidden md:block"
          >
            <div className="overflow-hidden rounded-xl border border-border/60 bg-card/30 backdrop-blur-sm">
              {/* Table header */}
              <div
                className={`grid items-center border-b border-border/40 bg-secondary/30 px-6 py-4 font-mono text-[11px] font-medium tracking-widest text-muted-foreground ${
                  mode === "table"
                    ? "grid-cols-[200px_1fr_1fr]"
                    : "grid-cols-[200px_1fr]"
                }`}
              >
                <div>CATEGORY</div>
                {(mode === "table" || mode === "evm") && (
                  <div className="flex items-center gap-2">
                    <Cpu className="h-3.5 w-3.5" />
                    EVM (TRADITIONAL)
                  </div>
                )}
                {(mode === "table" || mode === "genvm") && (
                  <div className="flex items-center gap-2 text-accent">
                    <Sparkles className="h-3.5 w-3.5" />
                    GENVM (INTELLIGENT)
                  </div>
                )}
              </div>

              {/* Table rows */}
              {rows.map((row, idx) => {
                const Icon = row.icon
                const isHovered = hoveredRow === idx
                return (
                  <motion.div
                    key={row.category}
                    onMouseEnter={() => setHoveredRow(idx)}
                    onMouseLeave={() => setHoveredRow(null)}
                    className={`grid items-start px-6 py-5 transition-colors ${
                      mode === "table"
                        ? "grid-cols-[200px_1fr_1fr]"
                        : "grid-cols-[200px_1fr]"
                    } ${idx !== rows.length - 1 ? "border-b border-border/20" : ""} ${
                      isHovered ? "bg-primary/[0.03]" : ""
                    }`}
                  >
                    {/* Category label */}
                    <div className="flex items-center gap-3 pt-0.5">
                      <div className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${
                        isHovered ? "bg-primary/15" : "bg-secondary/50"
                      }`}>
                        <Icon className={`h-4 w-4 transition-colors ${
                          isHovered ? "text-primary" : "text-muted-foreground"
                        }`} />
                      </div>
                      <span className="font-mono text-xs font-medium tracking-wider text-foreground">
                        {row.category}
                      </span>
                    </div>

                    {/* EVM Column */}
                    {(mode === "table" || mode === "evm") && (
                      <div className="pr-6">
                        <div className="mb-1.5 flex items-center gap-2">
                          <VerdictIcon score={row.evm.score} />
                          <span className="text-sm font-medium text-foreground/80">
                            {row.evm.value}
                          </span>
                        </div>
                        <p className="mb-2 text-xs leading-relaxed text-muted-foreground">
                          {row.evm.detail}
                        </p>
                        <ScoreDots score={row.evm.score} variant="evm" />
                      </div>
                    )}

                    {/* GenVM Column */}
                    {(mode === "table" || mode === "genvm") && (
                      <div className={mode === "table" ? "border-l border-border/20 pl-6" : ""}>
                        <div className="mb-1.5 flex items-center gap-2">
                          <VerdictIcon score={row.genvm.score} />
                          <span className="text-sm font-medium text-accent">
                            {row.genvm.value}
                          </span>
                        </div>
                        <p className="mb-2 text-xs leading-relaxed text-muted-foreground">
                          {row.genvm.detail}
                        </p>
                        <ScoreDots score={row.genvm.score} variant="genvm" />
                      </div>
                    )}
                  </motion.div>
                )
              })}
            </div>

            {/* Summary footer */}
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="rounded-lg border border-border/40 bg-card/20 p-4">
                <div className="mb-1 flex items-center gap-2">
                  <Cpu className="h-4 w-4 text-muted-foreground" />
                  <span className="font-mono text-[10px] tracking-widest text-muted-foreground">EVM TOTAL SCORE</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-foreground/70">
                    {rows.reduce((s, r) => s + r.evm.score, 0)}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground/60">/ {rows.length * 5}</span>
                </div>
              </div>
              <div className="rounded-lg border border-accent/20 bg-accent/5 p-4">
                <div className="mb-1 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-accent" />
                  <span className="font-mono text-[10px] tracking-widest text-accent/70">GENVM TOTAL SCORE</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-accent">
                    {rows.reduce((s, r) => s + r.genvm.score, 0)}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground/60">/ {rows.length * 5}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ===== MOBILE CARDS (shown < md) ===== */}
        <div className="flex flex-col gap-3 md:hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-3"
            >
              {rows.map((row) => (
                <MobileRow key={row.category} row={row} mode={mode} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
