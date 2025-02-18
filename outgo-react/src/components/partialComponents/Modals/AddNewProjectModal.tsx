import ProjectBeginButton from '../buttons/ProjectBeginButton'

export default function AddNewProjectModal() {
  return (
    <div className="w-full h-screen bg-gray-400/50 z-100 absolute left-0 top-0 flex items-center justify-center">
      <div className="bg-white p-4 w-1/3 h-48 rounded flex items-center justify-center flex-col">
        <h2 className="text-xl text-teal-800 font-semibold">
          Create a New Project to Start
        </h2>
        <ProjectBeginButton />
      </div>
    </div>
  )
}
