import { useState } from 'react'
import ProjectDashboardButton from '../components/partialComponents/buttons/ProjectCreateButton'
import FormModal from '../components/partialComponents/Modals/FormModal'
import AddProjectForm from '../components/partialComponents/Forms/AddProjectfrom'

export default function Project() {
  const [showModal, setShowModal] = useState(false)
  const [ProjectForm, setProjectForm] = useState(false)

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
          <p className="text-lg text-teal-900">{`Name:`}</p>
          <p className="text-lg text-teal-900">{`Description:`}</p>
          <p className="text-lg text-teal-900">{`Budget:`}</p>
          <p className="text-lg text-teal-900">{`Current Savings:`}</p>
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
