import { useState } from 'react'
import ProjectCreateButton from '../components/partialComponents/buttons/ProjectCreateButton'
import FormModal from '../components/partialComponents/Modals/FormModal'
import AddProjectForm from '../components/partialComponents/Forms/AddProjectform'
import { useSelector } from 'react-redux'
import { RootState } from '../Redux/store'
import { useProjectById } from '../apis/Project/useProjects'
import ProjectsList from '../components/partialComponents/projectPartials/ProjectsList'
import UpdateProjectForm from '../components/partialComponents/Forms/updateProjectForm'
import JoinOtherProjects from '../components/partialComponents/projectPartials/JoinOtherProjects'
import { useGetRequestsByProjectId } from '../apis/ProjectJoinRequest/useProjectJoinRequest'
import ProjectRequestNotification from '../components/partialComponents/projectPartials/ProjectRequestNotification'

export default function Project() {
  const { defaultProjectId } = useSelector((state: RootState) => state.user)
  const { data: project, isLoading, isError } = useProjectById(defaultProjectId)
  const [showModal, setShowModal] = useState(false)
  const [ProjectForm, setProjectForm] = useState(false)
  const [updateForm, setUpdateForm] = useState(false)
  const { data: projectRequest } = useGetRequestsByProjectId(defaultProjectId)

  if (defaultProjectId) {
    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error fetching project</div>
  }

  function editProject(): void {
    setUpdateForm(true)
    setShowModal(true)
  }

  return (
    <div className="p-4 w-full h-full overflow-auto">
      <div className="flex flex-col items-center justify-center gap-4 w-full h-full">
        {showModal && (
          <FormModal>
            {ProjectForm && (
              <AddProjectForm
                setShowModal={setShowModal}
                setProjectForm={setProjectForm}
              />
            )}
            {updateForm && (
              <UpdateProjectForm
                setShowModal={setShowModal}
                setUpdateForm={setUpdateForm}
              />
            )}
          </FormModal>
        )}
        {projectRequest && (
          <ProjectRequestNotification projectRequest={projectRequest} />
        )}
        <div className="w-full flex-1 flex flex-col justify-between items-start bg-teal-50 shadow-md rounded p-4 gap-4 relative mt-72 sm:mt-0">
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
            <p className="text-lg text-teal-900">{`Budget: ${
              project ? project.budget : ''
            }`}</p>
            <p className="text-lg text-teal-900">{`Current Savings: ${
              project ? project.savings : ''
            }`}</p>
          </div>
          <img
            src="/edit.png"
            className="w-8 h-8 absolute right-6 top-6 sm:right-12 sm:top-12 cursor-pointer"
            onClick={() => editProject()}
          />
        </div>
        <div className="flex flex-col sm:flex-row w-full flex-1 gap-4">
          <div className="w-full flex-1 flex flex-col justify-between items-start bg-teal-50 shadow-md rounded p-4 gap-4">
            <h2 className="text-teal-800 font-semibold text-2xl">
              Created Projects
            </h2>
            <ProjectsList role="Admin" />
            <ProjectCreateButton
              showForm={setProjectForm}
              setShowModal={setShowModal}
            />
          </div>
          <div className="w-full flex-1 flex flex-col justify-between items-start bg-teal-50 shadow-md rounded p-4 gap-4 min-h-36 relative">
            <JoinOtherProjects />
          </div>
        </div>
      </div>
    </div>
  )
}
