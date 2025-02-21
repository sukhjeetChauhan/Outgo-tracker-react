import { useState } from 'react'
import ProjectDashboardButton from '../components/partialComponents/buttons/ProjectCreateButton'
import FormModal from '../components/partialComponents/Modals/FormModal'
import AddProjectForm from '../components/partialComponents/Forms/AddProjectform'
import { useSelector } from 'react-redux'
import { RootState } from '../Redux/store'
import { useProjectById } from '../apis/Project/useProjects'

export default function Project() {
  const { defaultProjectId } = useSelector((state: RootState) => state.user)
  const { data: project, isLoading, isError } = useProjectById(defaultProjectId)
  const [showModal, setShowModal] = useState(false)
  const [ProjectForm, setProjectForm] = useState(false)

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error fetching project</div>
  if (project) console.log(project)

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 w-full p-4">
      {showModal && (
        <FormModal>
          {ProjectForm && (
            <AddProjectForm
              setShowModal={setShowModal}
              setProjectForm={setProjectForm}
            />
          )}
        </FormModal>
      )}
      <div className="w-full flex-1 flex flex-col justify-between items-start bg-teal-50 shadow-md rounded p-4 gap-4">
        <h2 className="text-teal-800 font-semibold text-2xl">
          Current Project Details
        </h2>
        <div className="flex-1 flex flex-col justify-around items-start">
          <p className="text-lg text-teal-900">{`Name: ${project.name}`}</p>
          <p className="text-lg text-teal-900">{`Description: ${project.description}`}</p>
          <p className="text-lg text-teal-900">{`Budget: Rs ${project.budget}`}</p>
          <p className="text-lg text-teal-900">{`Current Savings: Rs ${project.savings}`}</p>
        </div>
      </div>
      <div className="flex w-full flex-1 gap-4">
        <div className="w-full flex-1 flex flex-col justify-between items-start bg-teal-50 shadow-md rounded p-4 gap-4">
          <h2 className="text-teal-800 font-semibold text-2xl">
            Created Projects
          </h2>
          <ProjectDashboardButton
            showForm={setProjectForm}
            setShowModal={setShowModal}
          />
        </div>
        <div className="w-full flex-1 flex flex-col justify-between items-start bg-teal-50 shadow-md rounded p-4 gap-4">
          <h2 className="text-teal-800 font-semibold text-2xl">
            Joined Projects
          </h2>
        </div>
      </div>
    </div>
  )
}
