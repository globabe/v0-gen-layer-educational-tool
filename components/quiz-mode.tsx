"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  GraduationCap,
  Trophy,
  RotateCcw,
  CheckCircle2,
  XCircle,
  ChevronRight,
  Star,
  Sparkles,
  Zap,
} from "lucide-react"
import Image from "next/image"

interface QuizQuestion {
  id: number
  question: string
  options: string[]
  correctIndex: number
  explanation: string
  category: string
}

const questions: QuizQuestion[] = [
  {
    id: 1,
    question: "How much did GenLayer raise in its seed funding round?",
    options: ["$5 million", "$7.5 million", "$10 million", "$15 million"],
    correctIndex: 1,
    explanation:
      "GenLayer raised $7.5 million in its seed round in August 2024, led by North Island Ventures, with participation from notable investors including Arthur Hayes' Maelstrom fund.",
    category: "Funding",
  },
  {
    id: 2,
    question: "What is the name of GenLayer's virtual machine?",
    options: ["EVM", "WASM", "GenVM", "NeoVM"],
    correctIndex: 2,
    explanation:
      "GenVM (Generative Virtual Machine) is GenLayer's execution environment that natively integrates LLM capabilities for AI-powered smart contract execution.",
    category: "Technology",
  },
  {
    id: 3,
    question: "What consensus mechanism does GenLayer use?",
    options: [
      "Proof of Work",
      "Proof of Stake",
      "Optimistic Democracy",
      "Delegated Proof of Stake",
    ],
    correctIndex: 2,
    explanation:
      "GenLayer uses Optimistic Democracy, a unique consensus mechanism where 5 randomly selected validators (each using a different LLM) vote on transaction outcomes, with an appeal mechanism for challenges.",
    category: "Consensus",
  },
  {
    id: 4,
    question: "How many validators process each GenLayer transaction?",
    options: ["3", "5", "10", "21"],
    correctIndex: 1,
    explanation:
      "Each GenLayer transaction is processed by 5 validators: 1 leader who proposes the output and 4 verifiers who independently check it using different LLMs.",
    category: "Consensus",
  },
  {
    id: 5,
    question: "What are GenLayer's smart contracts called?",
    options: [
      "Smart Contracts",
      "Chaincode",
      "Intelligent Contracts",
      "Neural Contracts",
    ],
    correctIndex: 2,
    explanation:
      "GenLayer's smart contracts are called 'Intelligent Contracts' because they go beyond traditional smart contract capabilities by integrating AI, natural language processing, and web access.",
    category: "Technology",
  },
  {
    id: 6,
    question: "Which investment firm led GenLayer's seed round?",
    options: [
      "a16z Crypto",
      "North Island Ventures",
      "Paradigm",
      "Sequoia Capital",
    ],
    correctIndex: 1,
    explanation:
      "North Island Ventures led GenLayer's $7.5M seed round. Other investors included Node Capital, Arrington Capital, and Arthur Hayes' family office fund Maelstrom.",
    category: "Funding",
  },
  {
    id: 7,
    question:
      "What programming language is used to write GenLayer Intelligent Contracts?",
    options: ["Solidity", "Rust", "Python", "JavaScript"],
    correctIndex: 2,
    explanation:
      "Intelligent Contracts are written in Python with embedded natural language instructions, making them more accessible than traditional Solidity-based smart contracts.",
    category: "Technology",
  },
  {
    id: 8,
    question: "What happens if validators disagree on a GenLayer transaction?",
    options: [
      "The transaction is rejected",
      "A new leader is chosen",
      "All validators re-execute",
      "The transaction is rolled back",
    ],
    correctIndex: 1,
    explanation:
      "If the majority of validators disagree with the leader's proposed output, a new leader is selected from the validator set to repropose. An appeal window also allows community challenges.",
    category: "Consensus",
  },
  {
    id: 9,
    question: "What is GenLayer's testnet called?",
    options: ["Testnet Alpha", "Testnet Bradbury", "Testnet Genesis", "Testnet Turing"],
    correctIndex: 1,
    explanation:
      "GenLayer's testnet is called 'Testnet Bradbury,' described as a 'scholar's gym' where AI meets blockchain consensus. It was announced in January 2026.",
    category: "Milestones",
  },
  {
    id: 10,
    question: "How do GenLayer Intelligent Contracts access real-world data?",
    options: [
      "Through Chainlink oracles",
      "Via API gateways",
      "Direct internet access built into GenVM",
      "Through bridge protocols",
    ],
    correctIndex: 2,
    explanation:
      "Unlike traditional blockchains that require oracles, GenLayer's Intelligent Contracts can directly access and reason about web data through capabilities built into the GenVM, eliminating the need for centralized oracle services.",
    category: "Technology",
  },
]

function getRank(score: number, total: number) {
  const pct = score / total
  if (pct === 1) return { title: "GenLayer Grandmaster", color: "text-accent" }
  if (pct >= 0.8) return { title: "Protocol Scholar", color: "text-primary" }
  if (pct >= 0.6) return { title: "Chain Explorer", color: "text-primary" }
  if (pct >= 0.4) return { title: "Block Novice", color: "text-muted-foreground" }
  return { title: "Genesis Learner", color: "text-muted-foreground" }
}

export function QuizMode() {
  const [gameState, setGameState] = useState<"idle" | "playing" | "result">("idle")
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [shuffledQuestions, setShuffledQuestions] = useState<QuizQuestion[]>([])

  const startQuiz = useCallback(() => {
    const shuffled = [...questions].sort(() => Math.random() - 0.5).slice(0, 7)
    setShuffledQuestions(shuffled)
    setCurrentQuestion(0)
    setScore(0)
    setSelectedAnswer(null)
    setShowExplanation(false)
    setGameState("playing")
  }, [])

  const selectAnswer = (index: number) => {
    if (selectedAnswer !== null) return
    setSelectedAnswer(index)
    setShowExplanation(true)
    if (index === shuffledQuestions[currentQuestion].correctIndex) {
      setScore((s) => s + 1)
    }
  }

  const nextQuestion = () => {
    if (currentQuestion < shuffledQuestions.length - 1) {
      setCurrentQuestion((c) => c + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    } else {
      setGameState("result")
    }
  }

  const q = shuffledQuestions[currentQuestion]

  return (
    <section id="quiz" className="relative px-4 py-24">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-20" />
      <div className="relative z-10 mx-auto max-w-3xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 font-mono text-xs tracking-wider text-muted-foreground">
            <GraduationCap className="h-3.5 w-3.5 text-primary" />
            QUIZ MODE
          </div>
          <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            GenLayer Scholar
          </h2>
          <p className="mx-auto max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground">
            Test your knowledge of GenLayer's technology, history, and ecosystem.
            Answer 7 randomized questions to earn your rank.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {/* Idle state */}
          {gameState === "idle" && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="rounded-xl border border-border bg-card/80 p-8 text-center backdrop-blur-sm md:p-12"
            >
              <div className="mx-auto mb-6">
                <Image
                  src="/images/mochi-idea.png"
                  alt="Mochi having an idea"
                  width={120}
                  height={120}
                  className="mx-auto h-28 w-28 drop-shadow-[0_0_20px_oklch(0.65_0.25_290_/_0.3)]"
                />
              </div>
              <h3 className="mb-3 text-2xl font-bold text-foreground">
                Ready to prove your knowledge?
              </h3>
              <p className="mb-8 text-muted-foreground">
                7 questions covering GenLayer's technology, funding, consensus mechanism,
                and more. Each quiz is randomly generated.
              </p>
              <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
                {["Technology", "Funding", "Consensus", "Milestones"].map((cat) => (
                  <span
                    key={cat}
                    className="rounded-full border border-border bg-secondary/50 px-3 py-1 font-mono text-[10px] tracking-wider text-muted-foreground"
                  >
                    {cat.toUpperCase()}
                  </span>
                ))}
              </div>
              <button
                onClick={startQuiz}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3 font-mono text-xs font-semibold tracking-wider text-primary-foreground transition-all hover:bg-primary/90 glow-purple"
              >
                <Zap className="h-4 w-4" />
                START QUIZ
              </button>
            </motion.div>
          )}

          {/* Playing state */}
          {gameState === "playing" && q && (
            <motion.div
              key={`question-${currentQuestion}`}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
              className="rounded-xl border border-border bg-card/80 backdrop-blur-sm"
            >
              {/* Quiz header */}
              <div className="flex items-center justify-between border-b border-border/50 px-6 py-4">
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-primary/15 px-3 py-1 font-mono text-[10px] tracking-wider text-primary">
                    {q.category.toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <Star className="h-3.5 w-3.5 text-accent" />
                    <span className="font-mono text-xs text-muted-foreground">
                      {score}/{shuffledQuestions.length}
                    </span>
                  </div>
                  <span className="font-mono text-xs text-muted-foreground/50">
                    Q{currentQuestion + 1}/{shuffledQuestions.length}
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="h-0.5 bg-secondary">
                <motion.div
                  className="h-full bg-primary"
                  initial={{ width: 0 }}
                  animate={{
                    width: `${((currentQuestion + 1) / shuffledQuestions.length) * 100}%`,
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              <div className="p-6 md:p-8">
                {/* Question */}
                <h3 className="mb-6 text-lg font-semibold leading-relaxed text-foreground md:text-xl">
                  {q.question}
                </h3>

                {/* Options */}
                <div className="mb-6 flex flex-col gap-3">
                  {q.options.map((option, i) => {
                    const isSelected = selectedAnswer === i
                    const isCorrect = i === q.correctIndex
                    const showResult = selectedAnswer !== null

                    let optionClass =
                      "rounded-lg border px-5 py-4 text-left transition-all"

                    if (showResult) {
                      if (isCorrect) {
                        optionClass +=
                          " border-accent/50 bg-accent/10 text-accent"
                      } else if (isSelected && !isCorrect) {
                        optionClass +=
                          " border-destructive/50 bg-destructive/10 text-destructive-foreground"
                      } else {
                        optionClass +=
                          " border-border/30 bg-secondary/20 text-muted-foreground/50"
                      }
                    } else {
                      optionClass +=
                        " border-border bg-secondary/30 text-foreground hover:border-primary/50 hover:bg-primary/5 cursor-pointer"
                    }

                    return (
                      <motion.button
                        key={i}
                        onClick={() => selectAnswer(i)}
                        disabled={selectedAnswer !== null}
                        whileHover={selectedAnswer === null ? { scale: 1.01 } : undefined}
                        whileTap={selectedAnswer === null ? { scale: 0.99 } : undefined}
                        className={optionClass}
                      >
                        <div className="flex items-center gap-3">
                          <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md border border-border/50 font-mono text-xs">
                            {String.fromCharCode(65 + i)}
                          </span>
                          <span className="text-sm">{option}</span>
                          {showResult && isCorrect && (
                            <CheckCircle2 className="ml-auto h-5 w-5 flex-shrink-0 text-accent" />
                          )}
                          {showResult && isSelected && !isCorrect && (
                            <XCircle className="ml-auto h-5 w-5 flex-shrink-0 text-destructive" />
                          )}
                        </div>
                      </motion.button>
                    )
                  })}
                </div>

                {/* Explanation */}
                <AnimatePresence>
                  {showExplanation && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mb-6 overflow-hidden"
                    >
                      <div className="rounded-lg border border-border/50 bg-secondary/20 p-5">
                        <div className="mb-2 flex items-center gap-2">
                          <Sparkles className="h-4 w-4 text-primary" />
                          <span className="font-mono text-xs font-semibold tracking-wider text-foreground">
                            EXPLANATION
                          </span>
                        </div>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {q.explanation}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Next button */}
                {selectedAnswer !== null && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-end"
                  >
                    <button
                      onClick={nextQuestion}
                      className="inline-flex items-center gap-2 rounded-lg bg-primary/10 px-6 py-2.5 font-mono text-xs tracking-wider text-primary transition-colors hover:bg-primary/20"
                    >
                      {currentQuestion < shuffledQuestions.length - 1
                        ? "NEXT QUESTION"
                        : "SEE RESULTS"}
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          {/* Results state */}
          {gameState === "result" && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="rounded-xl border border-border bg-card/80 p-8 text-center backdrop-blur-sm md:p-12"
            >
              {(() => {
                const rank = getRank(score, shuffledQuestions.length)
                return (
                  <>
                    <div className="mx-auto mb-6">
                      <Image
                        src="/images/mochi-stonks.png"
                        alt="Mochi celebrating"
                        width={120}
                        height={120}
                        className="mx-auto h-28 w-28 drop-shadow-[0_0_20px_oklch(0.65_0.25_290_/_0.3)]"
                      />
                    </div>
                    <h3 className="mb-2 text-2xl font-bold text-foreground">
                      Quiz Complete!
                    </h3>
                    <p className={`mb-6 font-mono text-lg font-semibold ${rank.color}`}>
                      {rank.title}
                    </p>

                    {/* Score display */}
                    <div className="mx-auto mb-8 flex max-w-xs items-center justify-center gap-4">
                      <div className="flex-1 rounded-lg border border-border bg-secondary/30 p-4">
                        <div className="text-3xl font-bold text-primary">{score}</div>
                        <div className="font-mono text-[10px] tracking-wider text-muted-foreground">
                          CORRECT
                        </div>
                      </div>
                      <div className="flex-1 rounded-lg border border-border bg-secondary/30 p-4">
                        <div className="text-3xl font-bold text-foreground">
                          {shuffledQuestions.length}
                        </div>
                        <div className="font-mono text-[10px] tracking-wider text-muted-foreground">
                          TOTAL
                        </div>
                      </div>
                      <div className="flex-1 rounded-lg border border-border bg-secondary/30 p-4">
                        <div className="text-3xl font-bold text-accent">
                          {Math.round((score / shuffledQuestions.length) * 100)}%
                        </div>
                        <div className="font-mono text-[10px] tracking-wider text-muted-foreground">
                          ACCURACY
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-3">
                      <button
                        onClick={startQuiz}
                        className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-mono text-xs font-semibold tracking-wider text-primary-foreground transition-all hover:bg-primary/90 glow-purple"
                      >
                        <RotateCcw className="h-4 w-4" />
                        TRY AGAIN
                      </button>
                      <a
                        href="#flow"
                        className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary/50 px-6 py-3 font-mono text-xs font-semibold tracking-wider text-foreground transition-all hover:bg-secondary"
                      >
                        REVIEW MATERIAL
                      </a>
                    </div>
                  </>
                )
              })()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
