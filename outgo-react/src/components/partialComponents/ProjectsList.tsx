export default function ProjectsList() {
  return (
    <div className="flex items-center h-full gap-2 relative">
      <h2 className="text-2xl font-semibold">{`Project Name: Project 1`}</h2>
      <button>{`▼`}</button>
      <div className="absolute right-0 top-16 hidden">
        <div className="bg-white flex flex-col p-4 border-2 border-gray-200">
          <ul>
            <li>Project 1</li>
            <li>Project 2</li>
          </ul>
          <button className="rounded mt-4 px-4 py-2 bg-gray-500 text-white text-lg font-semibold">
            Create a Project
          </button>
        </div>
      </div>
    </div>
  )
}
