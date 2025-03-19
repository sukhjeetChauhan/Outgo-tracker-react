import { useSelector } from 'react-redux'
import { useGetProjectsByUserId } from '../../../apis/ProjectUser/useProjectUsers'
import { RootState } from '../../../Redux/store'
import ProjectSwitchButton from '../buttons/ProjectSwitchButton'
import { useDeleteProject } from '../../../apis/Project/useProjects'
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'

export default function ProjectsList() {
  const { id } = useSelector((state: RootState) => state.user)
  const { data: projects, error, isLoading } = useGetProjectsByUserId(id)
  const { mutate: deleteProject } = useDeleteProject()
  const navigate = useNavigate()

  function handleDeleteProject(id: number) {
    deleteProject(id, {
      onSuccess: () => {
        message.success('Project Deleted Successfully')
        navigate(0)
      },
    })
  }

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
            <div className="flex items-center justify-center gap-2">
              <ProjectSwitchButton id={project.id} />
              <button
                className="cursor-pointer"
                onClick={() => handleDeleteProject(project.id)}
              >
                <img src="/delete.png" className="w-8 h-8" />
              </button>
            </div>
          </div>
        ))}
      </div>
    )
  }
}
