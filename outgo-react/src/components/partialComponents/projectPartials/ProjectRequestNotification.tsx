import { message } from 'antd'
import { useDeleteProjectJoinRequest } from '../../../apis/ProjectJoinRequest/useProjectJoinRequest'
import { useCreateProjectUser } from '../../../apis/ProjectUser/useProjectUsers'
import { Role } from '../../../Types/enums'
import { useNavigate } from 'react-router-dom'

interface ProjectRequestNotificationProps {
  projectRequest: {
    id: number
    userName: string
    userId: string
    projectId: number
    status: string
  }
}

export default function ProjectRequestNotification({
  projectRequest,
}: ProjectRequestNotificationProps) {
  const { mutate: addProjectUser } = useCreateProjectUser()
  const { mutate: deleteProjectRequest } = useDeleteProjectJoinRequest()
  const navigate = useNavigate()

  function handleRequestAccept() {
    addProjectUser(
      {
        userId: projectRequest.userId,
        projectId: projectRequest.projectId,
        role: 'User' as Role,
      },
      {
        onSuccess: () => {
          message.success('User added to project successfully')
          deleteProjectRequest(projectRequest.id)
          navigate(0)
        },
      }
    )
  }
  return (
    <div className="w-full h-16 bg-teal-100 rounded">
      <div className="flex justify-between items-center p-2">
        <p className="text-lg text-teal-900">{`You have a Project Join Request from ${projectRequest?.userName}`}</p>
        <button
          className="rounded px-4 py-2 bg-teal-500 text-white text-lg font-semibold cursor-pointer"
          onClick={handleRequestAccept}
        >
          Accept
        </button>
      </div>
    </div>
  )
}
