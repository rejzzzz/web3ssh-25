"use client"

import { useState, useEffect } from "react"
import ProjectCard, { type Project } from "./project-card"

export default function ProjectsGrid() {
  const [projects, setProjects] = useState<Project[]>([])
  const [activeProject, setActiveProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadProjects() {
      try {
        setLoading(true)

        
        const projectData = (await import("../../data/2024/projects.json")).default

        setProjects(projectData)
      } catch (err) {
        console.error("Error loading projects:", err)
        setError("Failed to load projects. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    loadProjects()
  }, [])

  useEffect(() => {
    // Disable body scroll when a project is active
    if (activeProject) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [activeProject])

  const handleOpenProject = (project: Project) => {
    setActiveProject(project)
  }

  const handleCloseProject = () => {
    setActiveProject(null)
  }

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && activeProject) {
        handleCloseProject()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [activeProject])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center p-8 text-red-500">
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <>
      <style jsx global>{`
        /* Hide scrollbars for all elements */
        * {
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE and Edge */
        }
        
        /* Hide WebKit scrollbars */
        *::-webkit-scrollbar {
          display: none;
        }
        
        /* Hide scrollbar for body specifically */
        html, body {
          overflow-x: hidden;
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE and Edge */
        }
        
        html::-webkit-scrollbar, 
        body::-webkit-scrollbar {
          width: 0;
          height: 0;
          display: none;
        }
      `}</style>
      <div className="relative min-h-screen">
        {/* Gradient Background */}
        <div className="fixed inset-0 z-0">
          <div 
            className="absolute inset-0 bg-gradient-to-tr from-[#5C2D91] via-[#2E1B6B] to-[#0B0C6A]"
            style={{
              backgroundImage: `linear-gradient(
                to top right,
                #5C2D91,
                #4B2686 25%,
                #2E1B6B 50%,
                #1B1479 75%,
                #0B0C6A
              )`
            }}
          />
          <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]" />
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-12 relative z-10 overflow-hidden">
          <h1 className="text-4xl font-bold mb-12 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-300">Hackathon Projects</span> 
            <span className="text-white"> 2024</span>
          </h1>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-2xl" />
              <ul 
                className="space-y-4 relative p-6 rounded-2xl" 
                role="list" 
                aria-label="Hackathon projects"
              >
                {projects.map((project) => (
                  <li key={`${project.ProjectName}-${project.TeamName}`}>
                    <ProjectCard
                      project={project}
                      onOpen={handleOpenProject}
                      isActive={activeProject?.ProjectName === project.ProjectName}
                      onClose={handleCloseProject}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}