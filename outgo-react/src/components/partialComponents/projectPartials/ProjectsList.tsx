import { useSelector } from 'react-redux'
// import { useGetProjectsByUserId } from '../../../apis/ProjectUser/useProjectUsers'
import { RootState } from '../../../Redux/store'
import ProjectSwitchButton from '../buttons/ProjectSwitchButton'
import {
  useDeleteProject,
  useProjectByUserRole,
} from '../../../apis/Project/useProjects'
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useUpdateUser } from '../../../apis/Users/useUsers'
import { useDeleteByProjectAndUserId } from '../../../apis/ProjectUser/useProjectUsers'

export default function ProjectsList({ role }: { role: string }) {
  const {
    id: userId,
    firstName,
    lastName,
    defaultProjectId,
  } = useSelector((state: RootState) => ({
    id: state.user.id,
    firstName: state.user.firstName,
    lastName: state.user.lastName || '', // Provide a default value if lastName is undefined
    defaultProjectId: state.user.defaultProjectId,
  }))

  const {
    data: projects,
    error,
    isLoading,
  } = useProjectByUserRole(userId, role)
  const { mutate: deleteProject } = useDeleteProject()
  const { mutate: updateUser } = useUpdateUser()
  const { mutate: deleteUserProject } = useDeleteByProjectAndUserId()

  const navigate = useNavigate()

  function handleDeleteProject(id: number) {
    if (role === 'User') {
      deleteUserProject({
        userId: userId,
        projectId: id,
      })
      message.success('Project Deleted Successfully')
      navigate(0)
    }

    if (role === 'Admin') {
      console.log('Deleting project with id:', id)
      deleteProject(id, {
        onSuccess: () => {
          message.success('Project Deleted Successfully')

          let newdefaultId
          if (projects.length > 1) {
            if (id === defaultProjectId) {
              newdefaultId =
                projects[0].id === defaultProjectId
                  ? projects[1].id
                  : projects[0].id
            }
          } else {
            
            newdefaultId = null
          }
          if (
            (projects.length > 1 && id === defaultProjectId) ||
            projects.length === 1
          )
            if (userId) {
              updateUser({
                id: userId,
                user: {
                  id: userId,
                  firstName: firstName,
                  lastName: lastName,
                  email: '',
                  phoneNumber: '',
                  defaultProjectId: newdefaultId,
                },
              })
            }
          navigate(0)
        },
      })
    }
  }

  if (isLoading) return <div>Loading...</div>

  if (error)
    return (
      <div className="flex items-center justify-center w-full">
        <p className="text-lg text-teal-900">No Projects Found</p>
      </div>
    )
  if (projects) {
    if (projects.length === 0) {
      return (
        <div className="flex items-center justify-center w-full">
          <p className="text-lg text-teal-900">No Projects Found</p>
        </div>
      )
    }
    if (projects.length > 0) {
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
}
