import { useSelector } from 'react-redux'
import { RootState } from '../../../Redux/store'
import { useProjectById } from '../../../apis/Project/useProjects'

export default function ProjectDashboardName() {
  const { defaultProjectId } = useSelector((state: RootState) => state.user)
  const { data: project, isLoading, isError } = useProjectById(defaultProjectId)
  return (
    <div className="hidden sm:block">
      <h3 className="text-2xl font-semibold text-white">
        Project Name:{' '}
        <span className="font-normal text-white">
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
