"use client"

import { useId, useRef, useMemo } from "react"
import { AnimatePresence, motion } from "motion/react"
import { useOutsideClick } from "../../hooks/use-outside-click"
import {
  GithubIcon,
  ExternalLink,
  Youtube,
  X,
  Database,
  Code,
  Blocks,
  Wallet,
  Coins,
  FileCode,
  Shield,
  Globe,
  Cpu,
} from "lucide-react"

export interface Project {
  ProjectName: string
  TeamName: string
  GithubLink: string
  DeployedLink: string
  YoutubeLink: string
  ProblemSolve: string
  Challenges: string
  imageUrl?: string
}

interface ProjectCardProps {
  project: Project
  onOpen?: (project: Project) => void
  isActive: boolean
  onClose: () => void
}

// Web3 themed SVG components
const BlockchainIllustration = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" className="w-full h-full">
    <defs>
      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style={{ stopColor: "#6366f1", stopOpacity: 0.8 }} />
        <stop offset="100%" style={{ stopColor: "#8b5cf6", stopOpacity: 0.8 }} />
      </linearGradient>
    </defs>
    <rect width="800" height="500" fill="url(#grad1)" opacity="0.2" />
    <g fill="none" stroke="currentColor" strokeWidth="2" opacity="0.7">
      {Array.from({ length: 8 }).map((_, i) => (
        <g key={i}>
          <rect x={100 + i * 80} y={150} width="60" height="60" rx="4" />
          <line x1={130 + i * 80} y1={210} x2={130 + i * 80} y2={240} />
          <rect x={100 + i * 80} y={240} width="60" height="60" rx="4" />
          {i < 7 && <line x1={160 + i * 80} y1={180} x2={180 + i * 80} y2={180} />}
          {i < 7 && <line x1={160 + i * 80} y1={270} x2={180 + i * 80} y2={270} />}
        </g>
      ))}
    </g>
  </svg>
)

const SmartContractIllustration = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" className="w-full h-full">
    <defs>
      <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style={{ stopColor: "#10b981", stopOpacity: 0.8 }} />
        <stop offset="100%" style={{ stopColor: "#3b82f6", stopOpacity: 0.8 }} />
      </linearGradient>
    </defs>
    <rect width="800" height="500" fill="url(#grad2)" opacity="0.2" />
    <g fill="none" stroke="currentColor" strokeWidth="2" opacity="0.7">
      <rect x="250" y="150" width="300" height="200" rx="8" />
      <line x1="250" y1="190" x2="550" y2="190" />
      <text x="270" y="175" fill="currentColor" fontSize="16">
        Smart Contract
      </text>
      <g transform="translate(270, 210)">
        {Array.from({ length: 5 }).map((_, i) => (
          <g key={i}>
            <line x1="0" y1={i * 25} x2="260" y2={i * 25} strokeDasharray="5,5" />
            <text x="10" y={i * 25 - 10} fill="currentColor" fontSize="12">
              {
                [
                  "function transfer()",
                  "modifier onlyOwner()",
                  "event Transfer()",
                  "mapping balances",
                  "uint256 totalSupply",
                ][i]
              }
            </text>
          </g>
        ))}
      </g>
    </g>
  </svg>
)

const DecentralizedAppIllustration = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" className="w-full h-full">
    <defs>
      <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style={{ stopColor: "#f59e0b", stopOpacity: 0.8 }} />
        <stop offset="100%" style={{ stopColor: "#ef4444", stopOpacity: 0.8 }} />
      </linearGradient>
    </defs>
    <rect width="800" height="500" fill="url(#grad3)" opacity="0.2" />
    <g fill="none" stroke="currentColor" strokeWidth="2" opacity="0.7">
      <circle cx="400" cy="250" r="120" />
      <g>
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i * Math.PI) / 4
          const x1 = 400 + 120 * Math.cos(angle)
          const y1 = 250 + 120 * Math.sin(angle)
          const x2 = 400 + 180 * Math.cos(angle)
          const y2 = 250 + 180 * Math.sin(angle)
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />
        })}
      </g>
      <g>
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i * Math.PI) / 4
          const x = 400 + 180 * Math.cos(angle)
          const y = 250 + 180 * Math.sin(angle)
          return <circle key={i} cx={x} cy={y} r="15" />
        })}
      </g>
    </g>
  </svg>
)

const NFTIllustration = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" className="w-full h-full">
    <defs>
      <linearGradient id="grad4" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: "#ec4899", stopOpacity: 0.8 }} />
        <stop offset="100%" style={{ stopColor: "#8b5cf6", stopOpacity: 0.8 }} />
      </linearGradient>
    </defs>
    <rect width="800" height="500" fill="url(#grad4)" opacity="0.2" />
    <g fill="none" stroke="currentColor" strokeWidth="2" opacity="0.7">
      <rect x="300" y="150" width="200" height="200" rx="8" />
      <path d="M300,200 L500,200 M350,150 L350,350 M450,150 L450,350 M300,250 L500,250 M300,300 L500,300" />
      <text x="320" y="180" fill="currentColor" fontSize="16">
        NFT
      </text>
      <text x="370" y="180" fill="currentColor" fontSize="16">
        Collection
      </text>
      <g>
        {Array.from({ length: 9 }).map((_, i) => {
          const row = Math.floor(i / 3)
          const col = i % 3
          const x = 325 + col * 50
          const y = 225 + row * 50
          return <circle key={i} cx={x} cy={y} r="10" />
        })}
      </g>
    </g>
  </svg>
)

const DeFiIllustration = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" className="w-full h-full">
    <defs>
      <linearGradient id="grad5" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style={{ stopColor: "#0ea5e9", stopOpacity: 0.8 }} />
        <stop offset="100%" style={{ stopColor: "#6366f1", stopOpacity: 0.8 }} />
      </linearGradient>
    </defs>
    <rect width="800" height="500" fill="url(#grad5)" opacity="0.2" />
    <g fill="none" stroke="currentColor" strokeWidth="2" opacity="0.7">
      <path d="M200,250 C200,180 300,180 400,250 C500,320 600,320 600,250" />
      <path d="M200,300 C200,230 300,230 400,300 C500,370 600,370 600,300" />
      <g>
        {Array.from({ length: 5 }).map((_, i) => {
          const x = 200 + i * 100
          const y = 250 + (i % 2 === 0 ? 0 : 50)
          return (
            <g key={i}>
              <circle cx={x} cy={y} r="10" />
              <text x={x - 20} y={y - 20} fill="currentColor" fontSize="14">
                {["Lending", "Swap", "Yield", "Stake", "Pool"][i]}
              </text>
            </g>
          )
        })}
      </g>
    </g>
  </svg>
)

// Array of Web3 themed illustrations
const illustrations = [
  BlockchainIllustration,
  SmartContractIllustration,
  DecentralizedAppIllustration,
  NFTIllustration,
  DeFiIllustration,
]

// Array of Web3 themed icons from Lucide
const web3Icons = [
  { icon: Database, label: "Blockchain" },
  { icon: Code, label: "Smart Contract" },
  { icon: Blocks, label: "DApp" },
  { icon: Wallet, label: "Wallet" },
  { icon: Coins, label: "Tokens" },
  { icon: FileCode, label: "Protocol" },
  { icon: Shield, label: "Security" },
  { icon: Globe, label: "Web3" },
  { icon: Cpu, label: "Consensus" },
]

export default function ProjectCard({ project, onOpen, isActive, onClose }: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const id = useId()

  useOutsideClick(ref, onClose)

  // Generate a random illustration based on project name
  const randomIllustration = useMemo(() => {
    // Use project name to generate a consistent random index
    const hash = project.ProjectName.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
    const illustrationIndex = hash % illustrations.length
    const Illustration = illustrations[illustrationIndex]
    return <Illustration />
  }, [project.ProjectName])

  // Generate random Web3 icons for the project
  const projectIcons = useMemo(() => {
    // Use project name to generate a consistent set of icons
    const hash = project.ProjectName.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
    const numIcons = 3 + (hash % 3) // 3-5 icons

    // Select icons based on hash
    const selectedIcons = []
    for (let i = 0; i < numIcons; i++) {
      const iconIndex = (hash + i * 7) % web3Icons.length
      selectedIcons.push(web3Icons[iconIndex])
    }

    return selectedIcons
  }, [project.ProjectName])

  const defaultImage = `/placeholder.svg?height=400&width=600`
  const imageUrl = project.imageUrl || defaultImage

  return (
    <>
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isActive ? (
          <div className="fixed inset-0 grid place-items-center z-[100]">
            <motion.button
              key={`button-close-${project.ProjectName}-${id}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="flex absolute top-4 right-4 items-center justify-center bg-white rounded-full h-8 w-8 z-[101]"
              onClick={onClose}
              aria-label="Close project details"
            >
              <X className="h-5 w-5" />
            </motion.button>
            <motion.div
              layoutId={`card-${project.ProjectName}-${id}`}
              ref={ref}
              className="w-full max-w-[600px] h-full md:h-fit md:max-h-[90vh] flex flex-col bg-white/10 dark:bg-neutral-900/30 backdrop-blur-lg sm:rounded-3xl overflow-hidden border border-white/20"
              role="dialog"
              aria-modal="true"
              aria-labelledby={`title-${project.ProjectName}-${id}`}
            >
              <motion.div
                layoutId={`image-${project.ProjectName}-${id}`}
                className="relative h-60 lg:h-80 overflow-hidden"
              >
                {/* Placeholder illustration */}
                <div className="absolute inset-0 opacity-70 dark:opacity-50">{randomIllustration}</div>

                {/* Actual image (if available) */}
                {project.imageUrl && (
                  <img
                    width={600}
                    height={400}
                    src={imageUrl || "/placeholder.svg"}
                    alt={`${project.ProjectName} project image`}
                    className="w-full h-full sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-center relative z-10"
                  />
                )}

                {/* Project name overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 z-20">
                  <motion.h3
                    layoutId={`title-${project.ProjectName}-${id}`}
                    className="font-bold text-2xl text-white"
                    id={`title-${project.ProjectName}-${id}`}
                  >
                    {project.ProjectName}
                  </motion.h3>
                  <motion.p layoutId={`team-${project.TeamName}-${id}`} className="text-white/80">
                    {project.TeamName}
                  </motion.p>
                </div>
              </motion.div>

              <div className="flex flex-col p-4 md:p-6 overflow-y-auto">
                {/* Web3 technology icons */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {projectIcons.map((icon, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-1 px-3 py-1.5 text-xs rounded-full bg-white/10 dark:bg-white/5 text-neutral-800 dark:text-neutral-200 border border-white/10"
                    >
                      <icon.icon className="h-3.5 w-3.5" />
                      <span>{icon.label}</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end items-start mb-4">
                  <div className="flex gap-2">
                    {project.GithubLink && (
                      <motion.a
                        href={project.GithubLink}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 px-3 py-2 text-sm rounded-full font-medium bg-gray-100 hover:bg-gray-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200"
                        aria-label="View GitHub repository"
                      >
                        <GithubIcon className="h-4 w-4" />
                        <span>GitHub</span>
                      </motion.a>
                    )}
                    {project.DeployedLink && (
                      <motion.a
                        href={project.DeployedLink}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 px-3 py-2 text-sm rounded-full font-medium bg-gray-100 hover:bg-gray-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200"
                        aria-label="View live demo"
                      >
                        <ExternalLink className="h-4 w-4" />
                        <span>Live Demo</span>
                      </motion.a>
                    )}
                    {project.YoutubeLink && (
                      <motion.a
                        href={project.YoutubeLink}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 px-3 py-2 text-sm rounded-full font-medium bg-gray-100 hover:bg-gray-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200"
                        aria-label="Watch YouTube video"
                      >
                        <Youtube className="h-4 w-4" />
                        <span>YouTube</span>
                      </motion.a>
                    )}
                  </div>
                </div>

                <div className="mt-2 space-y-6">
                  {project.ProblemSolve && (
                    <div>
                      <h4 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-3">Problem</h4>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-neutral-600 dark:text-neutral-400 text-sm md:text-base overflow-y-auto pr-4 max-h-40 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-track]:bg-gray-100 hover:[&::-webkit-scrollbar-thumb]:bg-gray-400 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-700 dark:[&::-webkit-scrollbar-track]:bg-neutral-800"
                      >
                        <p className="whitespace-pre-wrap">{project.ProblemSolve}</p>
                      </motion.div>
                    </div>
                  )}

                  {project.Challenges && (
                    <div>
                      <h4 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-3">Challenges</h4>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-neutral-600 dark:text-neutral-400 text-sm md:text-base overflow-y-auto pr-4 max-h-40 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-track]:bg-gray-100 hover:[&::-webkit-scrollbar-thumb]:bg-gray-400 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-700 dark:[&::-webkit-scrollbar-track]:bg-neutral-800"
                      >
                        <p className="whitespace-pre-wrap">{project.Challenges}</p>
                      </motion.div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        ) : (
          <motion.div
            layoutId={`card-${project.ProjectName}-${id}`}
            onClick={() => onOpen?.(project)}
            className="p-4 flex flex-col md:flex-row justify-between items-center hover:bg-white/10 dark:hover:bg-white/5 backdrop-blur-sm rounded-xl cursor-pointer border border-white/10"
            tabIndex={0}
            role="button"
            aria-expanded="false"
            aria-controls={`expanded-${project.ProjectName}-${id}`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                onOpen?.(project)
              }
            }}
          >
            <div className="flex gap-4 flex-col md:flex-row">
              <motion.div
                layoutId={`image-${project.ProjectName}-${id}`}
                className="relative h-40 w-40 md:h-14 md:w-14 rounded-lg overflow-hidden"
              >
                {/* Small preview of the illustration */}
                <div className="absolute inset-0 opacity-70 dark:opacity-50">{randomIllustration}</div>

                {/* Actual image (if available) */}
                {project.imageUrl && (
                  <img
                    width={100}
                    height={100}
                    src={imageUrl || "/placeholder.svg"}
                    alt={`${project.ProjectName} project thumbnail`}
                    className="h-full w-full object-cover object-center relative z-10"
                  />
                )}
              </motion.div>
              <div>
                <motion.h3
                  layoutId={`title-${project.ProjectName}-${id}`}
                  className="font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left"
                >
                  {project.ProjectName}
                </motion.h3>
                <motion.p
                  layoutId={`team-${project.TeamName}-${id}`}
                  className="text-neutral-600 dark:text-neutral-400 text-center md:text-left"
                >
                  {project.TeamName}
                </motion.p>
              </div>
            </div>
            <motion.button
              className="px-4 py-2 text-sm rounded-full font-bold bg-gray-100 hover:bg-green-500 hover:text-white text-black mt-4 md:mt-0"
              aria-label="Open project details"
            >
              Open
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
