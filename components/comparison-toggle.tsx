"use client"

import { motion } from "framer-motion"
import {
  ArrowLeftRight,
  Code,
  Brain,
  Globe,
  FileCode2,
  Check,
  X,
} from "lucide-react"

interface TableRow {
  feature: string
  icon: React.ElementType
  evm: string
  genvm: string
  evmGood: boolean
  genvmGood: boolean
}

const tableData: TableRow[] = [
  {
    feature: "Language",
    icon: Code,
    evm: "Solidity",
    genvm: "Python",
    evmGood: false,
    genvmGood: true,
  },
  {
    feature: "Logic",
    icon: Brain,
    evm: "Deterministic",
    genvm: "Non-deterministic (AI-driven)",
    evmGood: false,
    genvmGood: true,
  },
  {
    feature: "Data Access",
    icon: Globe,
    evm: "Oracles only",
    genvm: "Native Web Access",
    evmGood: false,
    genvmGood: true,
  },
  {
    feature: "Contracts",
    icon: FileCode2,
    evm: "Smart Contracts",
    genvm: "Intelligent Contracts",
    evmGood: false,
    genvmGood: true,
  },
]

function VerdictBadge({ good }: { good: boolean }) {
  return good ? (
    <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-medium text-accent">
      <Check className="h-3 w-3" />
      Advanced
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
      <X className="h-3 w-3" />
      Limited
    </span>
  )
}

export function ComparisonToggle() {
  return (
    <section id="compare" className="relative px-4 py-24">
      <div className="relative z-10 mx-auto max-w-5xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 font-mono text-xs tracking-wider text-muted-foreground">
            <ArrowLeftRight className="h-3.5 w-3.5 text-primary" />
            COMPARISON TABLE
          </div>
          <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            EVM vs GenVM
          </h2>
          <p className="mx-auto max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground">
            A head-to-head comparison of the traditional Ethereum Virtual Machine
            and GenLayer{"'"}s Intelligent Virtual Machine.
          </p>
        </motion.div>

        {/* ===== Desktop Table ===== */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="hidden md:block"
        >
          <div className="overflow-hidden rounded-xl border border-border/60 bg-card/30 backdrop-blur-sm">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border/40 bg-secondary/30">
                  <th className="px-6 py-4 font-mono text-[11px] font-medium tracking-widest text-muted-foreground">
                    FEATURE
                  </th>
                  <th className="px-6 py-4 font-mono text-[11px] font-medium tracking-widest text-muted-foreground">
                    EVM (TRADITIONAL)
                  </th>
                  <th className="border-l border-border/30 px-6 py-4 font-mono text-[11px] font-medium tracking-widest text-accent">
                    GENVM (GENLAYER)
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, idx) => {
                  const Icon = row.icon
                  return (
                    <tr
                      key={row.feature}
                      className={`group transition-colors hover:bg-primary/[0.03] ${
                        idx !== tableData.length - 1 ? "border-b border-border/20" : ""
                      }`}
                    >
                      {/* Feature */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary/50 transition-colors group-hover:bg-primary/15">
                            <Icon className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
                          </div>
                          <span className="text-sm font-semibold text-foreground">
                            {row.feature}
                          </span>
                        </div>
                      </td>
                      {/* EVM */}
                      <td className="px-6 py-5">
                        <div className="flex flex-col gap-1.5">
                          <span className="text-sm text-foreground/70">{row.evm}</span>
                          <VerdictBadge good={row.evmGood} />
                        </div>
                      </td>
                      {/* GenVM */}
                      <td className="border-l border-border/30 px-6 py-5">
                        <div className="flex flex-col gap-1.5">
                          <span className="text-sm font-medium text-accent">{row.genvm}</span>
                          <VerdictBadge good={row.genvmGood} />
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* ===== Mobile Cards ===== */}
        <div className="flex flex-col gap-3 md:hidden">
          {tableData.map((row, idx) => {
            const Icon = row.icon
            return (
              <motion.div
                key={row.feature}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="rounded-xl border border-border/60 bg-card/40 p-4"
              >
                <div className="mb-3 flex items-center gap-2">
                  <Icon className="h-4 w-4 text-primary" />
                  <span className="text-sm font-semibold text-foreground">
                    {row.feature}
                  </span>
                </div>
                <div className="mb-2.5 rounded-lg border border-border/40 bg-secondary/20 p-3">
                  <span className="mb-1 block font-mono text-[10px] tracking-widest text-muted-foreground/60">
                    EVM (TRADITIONAL)
                  </span>
                  <span className="text-sm text-foreground/70">{row.evm}</span>
                  <div className="mt-1.5">
                    <VerdictBadge good={row.evmGood} />
                  </div>
                </div>
                <div className="rounded-lg border border-accent/20 bg-accent/5 p-3">
                  <span className="mb-1 block font-mono text-[10px] tracking-widest text-accent/70">
                    GENVM (GENLAYER)
                  </span>
                  <span className="text-sm font-medium text-accent">{row.genvm}</span>
                  <div className="mt-1.5">
                    <VerdictBadge good={row.genvmGood} />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
