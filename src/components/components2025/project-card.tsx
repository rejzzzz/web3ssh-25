"use client"

import { useId, useRef } from "react"
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
}

interface ProjectCardProps {
  project: Project
  onOpen?: (project: Project) => void
  isActive: boolean
  onClose: () => void
}

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

// Map project names to their corresponding image paths
const projectImageMap: Record<string, string> = {
  "Project-1_Decentrald": "/projects/Project-1_Decentrald.png",
  "Project-2_Happy Piggy Bank": "/projects/Project-2_Happy Piggy Bank.png",
  "Project-3_Tokenize": "/projects/Project-3_Tokenize.png",
  "Project-4_SAVE X ROSS": "/projects/Project-4_SAVE X ROSS.png",
  "Project-5_Blockchain-based...": "/projects/Project-5_Blockchain-based....png",
  "Project-6_TeraChain": "/projects/Project-6_TeraChain.png",
  "Project-7_Multi-Send Application": "/projects/Project-7_Multi-Send Application.png",
  "Project-8_PharmZy": "/projects/Project-8_PharmZy.png",
  "Project-9_Decentralised": "/projects/Project-9_Decentralised.png",
  "Project-10_MedPulseAI": "/projects/Project-10_MedPulseAI.png",
  "Project-11_Attend Smart": "/projects/Project-11_Attend Smart.png",
  "Project-12_JewelAssure": "/projects/Project-12_JewelAssure.png",
  "Project-13_AUTHENTICITY SENTINEL AI (ASA)": "/projects/Project-13_AUTHENTICITY SENTINEL AI (ASA).png",
  "Project-14_CrediFlow": "/projects/Project-14_CrediFlow.png",
  "Project-15_EthSplit": "/projects/Project-15_EthSplit.png",
  "Project-16_Music_NFT": "/projects/Project-16_Music_NFT.png",
  "Project-17_Lockie": "/projects/Project-17_Lockie.png",
  "Project-18_Carbon": "/projects/Project-18_Carbon.png",
  "Project-19_fund33": "/projects/Project-19_fund33.png",
  "Project-20_SecureSwap": "/projects/Project-20_SecureSwap.png",
  "Project-21_Xfile": "/projects/Project-21_Xfile.png",
  "Project-22_KNOW": "/projects/Project-22_KNOW.png",
  "Project-23_Grantitude": "/projects/Project-23_Grantitude.png",
  "Project-24_Voting dAPP": "/projects/Project-24_Voting dAPP.png",
  "Project-25_Dfiles": "/projects/Project-25_Dfiles.png",
  "Project-26_Mercado": "/projects/Project-26_Mercado.png",
  "Project-27_CHARITY CHAIN": "/projects/Project-27_CHARITY CHAIN.png",
  "Project-28_Artify - Decentralized Art Marketplace": "/projects/Project-28_Artify - Decentralized Art Marketplace.png",
  "Project-29_ThriftyDapp": "/projects/Project-29_ThriftyDapp.png",
  "Project-30_TendersRaid": "/projects/Project-30_TendersRaid.png",
  "Project-31_EngageCoin": "/projects/Project-31_EngageCoin.png",
  "Project-32_medKART": "/projects/Project-32_medKART.png",
}

export default function ProjectCard({ project, onOpen, isActive, onClose }: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const id = useId()

  useOutsideClick(ref, onClose)

  // Generate random Web3 icons for the project
  const projectIcons = (() => {
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
  })()

  // Function to find the best matching image path based on the project name
  const findMatchingImagePath = (projectName: string): string => {
    // First try exact match
    if (projectImageMap[projectName]) {
      return projectImageMap[projectName]
    }

    // If no exact match, try to find partial matches
    const partialMatches = Object.keys(projectImageMap).filter(
      (key) => projectName.includes(key) || key.includes(projectName),
    )

    if (partialMatches.length > 0) {
      // Return the first partial match
      return projectImageMap[partialMatches[0]]
    }

    // If no match found, return a placeholder
    return getPlaceholderSVG();
  }

  // Get the correct image path based on the project name
  const imageUrl = findMatchingImagePath(project.ProjectName)

  function getPlaceholderSVG() {
    const svg = `
      <svg width="600" height="400" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#f0f0f0"/>
        <text x="50%" y="50%" font-family="Arial" font-size="24" fill="#666" 
          text-anchor="middle" dominant-baseline="middle">
          No Image Available
        </text>
      </svg>
    `.trim();
  
    return `data:image/svg+xml;base64,${btoa(svg)}`;
  }

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
                {/* Project image */}
                <img
                  width={600}
                  height={400}
                  src={imageUrl || "/placeholder.svg"}
                  alt={`${project.ProjectName} project image`}
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg?height=400&width=600"
                    e.currentTarget.onerror = null
                  }}
                  className="w-full h-full sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-center relative z-10"
                />

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
                {/* Project thumbnail */}
                <img
                  width={100}
                  height={100}
                  src={imageUrl || "/placeholder.svg"}
                  alt={`${project.ProjectName} project thumbnail`}
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg?height=100&width=100"
                    e.currentTarget.onerror = null
                  }}
                  className="h-full w-full object-cover object-center relative z-10"
                />
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
