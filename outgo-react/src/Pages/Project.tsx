import { useState } from 'react'
import ProjectCreateButton from '../components/partialComponents/buttons/ProjectCreateButton'
import FormModal from '../components/partialComponents/Modals/FormModal'
import AddProjectForm from '../components/partialComponents/Forms/AddProjectform'
import { useSelector } from 'react-redux'
import { RootState } from '../Redux/store'
import { useProjectById } from '../apis/Project/useProjects'
import ProjectsList from '../components/partialComponents/projectPartials/ProjectsList'

export default function Project() {
  const { defaultProjectId } = useSelector((state: RootState) => state.user)
  const { data: project, isLoading, isError } = useProjectById(defaultProjectId)
  const [showModal, setShowModal] = useState(false)
  const [ProjectForm, setProjectForm] = useState(false)

  if (defaultProjectId) {
    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error fetching project</div>
  }

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-5px)] gap-4 w-full p-4 overflow-y-auto">
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
      <div className="w-full flex-1 flex flex-col justify-between items-start bg-teal-50 shadow-md rounded p-4 gap-4 mt-28 sm:mt-20">
        <h2 className="text-teal-800 font-semibold text-2xl">
          Current Project Details
        </h2>
        <div className="flex-1 flex flex-col justify-around items-start">
          <p className="text-lg text-teal-900">{`Name: ${
            project ? project.name : ''
          }`}</p>
          <p className="text-lg text-teal-900">{`Description: ${
            project ? project.description : ''
          }`}</p>
          <p className="text-lg text-teal-900">{`Budget: Rs ${
            project ? project.budget : ''
          }`}</p>
          <p className="text-lg text-teal-900">{`Current Savings: Rs ${
            project ? project.savings : ''
          }`}</p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row w-full flex-1 gap-4">
        <div className="w-full flex-1 flex flex-col justify-between items-start bg-teal-50 shadow-md rounded p-4 gap-4">
          <h2 className="text-teal-800 font-semibold text-2xl">
            Created Projects
          </h2>
          <ProjectsList />
          <ProjectCreateButton
            showForm={setProjectForm}
            setShowModal={setShowModal}
          />
        </div>
        <div className="w-full flex-1 flex flex-col justify-between items-start bg-teal-50 shadow-md rounded p-4 gap-4 min-h-36">
          <h2 className="text-teal-800 font-semibold text-2xl">
            Joined Projects
          </h2>
        </div>
      </div>
    </div>
  )
}
