import { useSelector } from 'react-redux'
import { RootState } from '../../../Redux/store'
import { useProjectById } from '../../../apis/Project/useProjects'

export default function ProjectDashboardName() {
  const { defaultProjectId } = useSelector((state: RootState) => state.user)
  const { data: project, isLoading, isError } = useProjectById(defaultProjectId)
  return (
    <div>
      <h3 className="text-2xl font-semibold">
        Project Name:{' '}
        <span>
          {isLoading
            ? 'Loading...'
            : isError
            ? 'Error fetching project'
            : project?.name}
        </span>
      </h3>
    </div>
  )
}
