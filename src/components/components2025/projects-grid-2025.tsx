'use client';

import { useState, useEffect } from 'react';
import ProjectCard2025, { type Project2025 } from './project-card-2025';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Filter, Search, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Simple loading component that matches the UI
function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 flex justify-center items-center">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Simple spinner */}
        <motion.div
          className="w-16 h-16 border-4 border-white/20 border-t-cyan-400 rounded-full mx-auto mb-6"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />

        {/* Loading text */}
        <motion.h2
          className="text-2xl font-bold text-white mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
            Loading Projects...
          </span>
        </motion.h2>

        <motion.p
          className="text-white/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Please wait while we fetch the amazing projects
        </motion.p>

        {/* Simple animated dots */}
        <motion.div
          className="flex justify-center space-x-1 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-cyan-400 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function ProjectsGrid2025() {
  const [projects, setProjects] = useState<Project2025[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project2025[]>([]);
  const [activeProject, setActiveProject] = useState<Project2025 | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTrack, setSelectedTrack] = useState<string>('All');
  const [showFilters, setShowFilters] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function loadProjects() {
      try {
        setLoading(true);
        const response = await fetch('/api/projects');
        const data = await response.json();

        if (data.success) {
          setProjects(data.projects);
          setFilteredProjects(data.projects);
        } else {
          setError(data.message || 'Failed to load projects');
        }
      } catch (err) {
        console.error('Error loading projects:', err);
        setError('Failed to load projects. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  // Filter projects based on search and track
  useEffect(() => {
    let filtered = projects;

    if (searchTerm) {
      filtered = filtered.filter(
        (project) =>
          project.projectName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          project.teamName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          project.technologiesUsed.some((tech) =>
            tech.toLowerCase().includes(searchTerm.toLowerCase()),
          ),
      );
    }

    if (selectedTrack !== 'All') {
      filtered = filtered.filter((project) =>
        project.tracks.includes(selectedTrack),
      );
    }

    setFilteredProjects(filtered);
  }, [projects, searchTerm, selectedTrack]);

  const handleOpenProject = (project: Project2025) => {
    setActiveProject(project);
  };

  const handleCloseProject = () => {
    setActiveProject(null);
  };

  const handleBackToHome = () => {
    router.push('/');
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && activeProject) {
        handleCloseProject();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeProject]);

  const allTracks = [
    'All',
    ...Array.from(new Set(projects.flatMap((p) => p.tracks))),
  ];

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 flex justify-center items-center">
        <motion.div
          className="text-center p-8 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="text-6xl mb-4"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            ⚠️
          </motion.div>
          <p className="text-white text-lg mb-6">{error}</p>
          <motion.button
            onClick={() => window.location.reload()}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl hover:from-cyan-600 hover:to-blue-600 font-semibold shadow-lg transition-all duration-200"
          >
            Retry Loading
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <style jsx global>{`
        * {
          scrollbar-width: thin;
          scrollbar-color: rgba(59, 130, 246, 0.5) transparent;
        }

        *::-webkit-scrollbar {
          width: 6px;
        }

        *::-webkit-scrollbar-track {
          background: transparent;
        }

        *::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.5);
          border-radius: 3px;
        }

        *::-webkit-scrollbar-thumb:hover {
          background: rgba(59, 130, 246, 0.7);
        }

        html,
        body {
          overflow-x: hidden;
        }
      `}</style>

      <div className="relative min-h-screen overflow-hidden">
        {/* Enhanced Multi-layer Background */}
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900" />
          <div className="absolute inset-0 bg-gradient-to-tr from-violet-900/30 via-transparent to-cyan-900/30" />

          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,theme(colors.blue.600),transparent_25%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,theme(colors.purple.600),transparent_25%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,theme(colors.indigo.600),transparent_25%)]" />
          </div>

          {/* Animated background elements */}
          <motion.div
            className="absolute top-20 left-20 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl"
            animate={{
              x: [0, 100, -50, 0],
              y: [0, -50, 50, 0],
              scale: [1, 1.2, 0.8, 1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: 'easeInOut',
              repeatType: 'reverse',
            }}
          />
          <motion.div
            className="absolute top-1/2 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
            animate={{
              x: [0, -80, 40, 0],
              y: [0, 60, -30, 0],
              scale: [1, 0.8, 1.3, 1],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: 'easeInOut',
              repeatType: 'reverse',
            }}
          />
          <motion.div
            className="absolute bottom-20 left-1/3 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl"
            animate={{
              x: [0, 60, -60, 0],
              y: [0, -40, 40, 0],
              scale: [1, 1.1, 0.9, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'easeInOut',
              repeatType: 'reverse',
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Back Button */}
          <motion.div
            className="absolute top-6 left-6 z-20"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.button
              onClick={handleBackToHome}
              whileHover={{ scale: 1.05, x: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-xl border border-white/20 text-white transition-all duration-200 shadow-lg"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm font-medium">Back to Home</span>
            </motion.button>
          </motion.div>

          {/* Header Section */}
          <div className="container mx-auto px-4 pt-20 pb-8">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.h1
                className="text-5xl md:text-6xl font-bold mb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-300 to-purple-400">
                  Hackathon
                </span>
                <br />
                <span className="text-white">Projects 2025</span>
              </motion.h1>

              <motion.p
                className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Explore innovative Web3 projects built by talented developers
                during our 2025 hackathon
              </motion.p>

              {/* Stats */}
              <motion.div
                className="flex justify-center gap-8 mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-400">
                    {filteredProjects.length}
                  </div>
                  <div className="text-white/60 text-sm">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">Web3</div>
                  <div className="text-white/60 text-sm">Technology</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-indigo-400">2025</div>
                  <div className="text-white/60 text-sm">Edition</div>
                </div>
              </motion.div>

              {/* Search and Filter */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                {/* Search Bar */}
                <div className="relative flex-1 w-full sm:w-auto">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search projects, teams, technologies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>

                {/* Filter Button */}
                <motion.button
                  onClick={() => setShowFilters(!showFilters)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-2 px-6 py-3 backdrop-blur-sm rounded-xl border transition-all duration-200 ${
                    showFilters || selectedTrack !== 'All'
                      ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300'
                      : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                  }`}
                >
                  <Filter className="h-4 w-4" />
                  <span>Filter</span>
                  {selectedTrack !== 'All' && (
                    <span className="bg-cyan-500 text-white text-xs px-2 py-1 rounded-full">
                      {selectedTrack}
                    </span>
                  )}
                </motion.button>
              </motion.div>

              {/* Filter Dropdown */}
              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="mt-4 p-4 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 max-w-2xl mx-auto"
                  >
                    <h4 className="text-white font-medium mb-3">
                      Filter by Track:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {allTracks.map((track) => (
                        <motion.button
                          key={track}
                          onClick={() => setSelectedTrack(track)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`px-3 py-2 text-sm rounded-full transition-all duration-200 ${
                            selectedTrack === track
                              ? 'bg-cyan-500 text-white'
                              : 'bg-white/10 text-white/80 hover:bg-white/20 border border-white/20'
                          }`}
                        >
                          {track}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Projects Grid Section */}
          <div className="container mx-auto px-4 pb-16">
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {/* Projects Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                <AnimatePresence>
                  {filteredProjects.map((project, index) => (
                    <motion.div
                      key={project.submissionId}
                      initial={{ opacity: 0, y: 30, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -30, scale: 0.9 }}
                      transition={{
                        duration: 0.3,
                        delay: index * 0.03,
                        ease: 'easeOut',
                      }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-50px' }}
                    >
                      <ProjectCard2025
                        project={project}
                        onOpen={handleOpenProject}
                        isActive={
                          activeProject?.submissionId === project.submissionId
                        }
                        onClose={handleCloseProject}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* No Results Message */}
              {filteredProjects.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-16"
                >
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-white text-2xl font-bold mb-2">
                    No Projects Found
                  </h3>
                  <p className="text-white/60 mb-6">
                    Try adjusting your search or filter criteria
                  </p>
                  <motion.button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedTrack('All');
                      setShowFilters(false);
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl transition-all duration-200"
                  >
                    Clear Filters
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
