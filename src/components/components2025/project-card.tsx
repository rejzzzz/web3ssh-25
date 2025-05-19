"use client"

import { useId, useRef } from "react"
import { AnimatePresence, motion } from "motion/react"
import { useOutsideClick } from "../../hooks/use-outside-click"
import { GithubIcon, ExternalLink, Youtube, X } from "lucide-react"

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

export default function ProjectCard({ project, onOpen, isActive, onClose }: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const id = useId()

  useOutsideClick(ref, onClose)

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
              <motion.div layoutId={`image-${project.ProjectName}-${id}`}>
                <img
                  width={600}
                  height={400}
                  src={imageUrl || "/placeholder.svg"}
                  alt={`${project.ProjectName} project image`}
                  className="w-full h-60 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-center"
                />
              </motion.div>

              <div className="flex flex-col p-4 md:p-6 overflow-y-auto">
                <div className="flex justify-between items-start">
                  <div>
                    <motion.h3
                      layoutId={`title-${project.ProjectName}-${id}`}
                      className="font-bold text-xl text-neutral-800 dark:text-neutral-200"
                      id={`title-${project.ProjectName}-${id}`}
                    >
                      {project.ProjectName}
                    </motion.h3>
                    <motion.p
                      layoutId={`team-${project.TeamName}-${id}`}
                      className="text-neutral-600 dark:text-neutral-400"
                    >
                      {project.TeamName}
                    </motion.p>
                  </div>

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

                <div className="mt-6 space-y-6">
                  {project.ProblemSolve && (
                    <div>
                      <h4 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-3">Problem</h4>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-neutral-600 dark:text-neutral-400 text-sm md:text-base overflow-y-auto pr-4 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-track]:bg-gray-100 hover:[&::-webkit-scrollbar-thumb]:bg-gray-400 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-700 dark:[&::-webkit-scrollbar-track]:bg-neutral-800"
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
                        className="text-neutral-600 dark:text-neutral-400 text-sm md:text-base overflow-y-auto pr-4 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-track]:bg-gray-100 hover:[&::-webkit-scrollbar-thumb]:bg-gray-400 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-700 dark:[&::-webkit-scrollbar-track]:bg-neutral-800"
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
              <motion.div layoutId={`image-${project.ProjectName}-${id}`}>
                <img
                  width={100}
                  height={100}
                  src={imageUrl || "/placeholder.svg"}
                  alt={`${project.ProjectName} project thumbnail`}
                  className="h-40 w-40 md:h-14 md:w-14 rounded-lg object-cover object-center"
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
