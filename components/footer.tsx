"use client"

import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="border-t border-border/50 px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="flex items-center gap-2.5">
            <Image
              src="/images/mochi-love.png"
              alt="Mochi showing love"
              width={28}
              height={28}
              className="h-7 w-7"
            />
            <span className="font-mono text-xs font-bold tracking-wider text-foreground">
              GENLAYER<span className="text-primary">.academy</span>
            </span>
          </div>

          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
            An interactive educational tool exploring GenLayer's intelligent blockchain
            technology. Built for the curious builder.
          </p>

          <div className="flex items-center gap-4">
            <a
              href="https://www.genlayer.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-xs tracking-wider text-muted-foreground transition-colors hover:text-primary"
            >
              GENLAYER.COM
              <ExternalLink className="h-3 w-3" />
            </a>
            <span className="h-3 w-px bg-border" />
            <a
              href="https://docs.genlayer.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-xs tracking-wider text-muted-foreground transition-colors hover:text-primary"
            >
              DOCS
              <ExternalLink className="h-3 w-3" />
            </a>
            <span className="h-3 w-px bg-border" />
            <a
              href="https://github.com/yeagerai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-xs tracking-wider text-muted-foreground transition-colors hover:text-primary"
            >
              GITHUB
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          <div className="font-mono text-[10px] tracking-wider text-muted-foreground/40">
            EDUCATIONAL TOOL - NOT AFFILIATED WITH GENLAYER
          </div>
        </div>
      </div>
    </footer>
  )
}
