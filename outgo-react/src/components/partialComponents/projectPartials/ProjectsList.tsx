import { useSelector } from 'react-redux'
import { useGetProjectsByUserId } from '../../../apis/ProjectUser/useProjectUsers'
import { RootState } from '../../../Redux/store'
import ProjectSwitchButton from '../buttons/ProjectSwitchButton'

export default function ProjectsList() {
  const { id } = useSelector((state: RootState) => state.user)
  const { data: projects, error, isLoading } = useGetProjectsByUserId(id)

  if (isLoading) return <div>Loading...</div>

  if (error) return <div>Error fetching projects</div>
  if (projects) {
    const reversedProjects = [...projects].reverse()
    return (
      <div className="flex flex-col p-2 w-full h-48 overflow-y-auto">
        {reversedProjects.map((project: { id: number; name: string }) => (
          <div
            key={project.id}
            className="flex justify-between items-center w-full"
          >
            <p>{project.name}</p>
            <ProjectSwitchButton id={project.id} />
          </div>
        ))}
      </div>
    )
  }
}
