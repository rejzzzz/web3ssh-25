import ProjectsGrid from "../../../components/components2025/projects-grid"

export default function Page() {
  return (
    <main className="min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 to-gray-900 text-white">
      <div className="absolute inset-0 bg-[url('/grid.png')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      <ProjectsGrid />
    </main>
  )
}
