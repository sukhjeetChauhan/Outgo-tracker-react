import { useState } from 'react' //
import { useSelector } from 'react-redux'
import { RootState } from '../../../Redux/store'
import { useGetRequestsByUserId } from '../../../apis/ProjectJoinRequest/useProjectJoinRequest'
import ProjectJoinRequestForm from './ProjectJoinRequestForm'
import ProjectsList from './ProjectsList'

export default function JoinOtherProjects() {
  const [showModal, setShowModal] = useState(false)
  const [display, setDisplay] = useState('project')

  const { id } = useSelector((state: RootState) => state.user)

  const { data: projectRequestData } = useGetRequestsByUserId(id)

  return (
    <>
      {showModal && <ProjectJoinRequestForm setShowModal={setShowModal} />}
      <div className="flex flex-col items-start justify-center">
        <h2 className="text-teal-800 font-semibold text-2xl">
          Joined Projects
        </h2>
        <div className="flex w-full justify-start items-center gap-2 mb-4">
          <button
            className={`rounded mt-4 px-4 py-2 ${
              display == 'project'
                ? 'bg-teal-500 text-white'
                : 'bg-white border-2 border-teal-500 text-teal-500'
            } text-base text-center cursor-pointer`}
            onClick={() => setDisplay('project')}
          >
            Projects
          </button>
          <button
            className={`rounded mt-4 px-4 py-2 ${
              display == 'request'
                ? 'bg-teal-500 text-white'
                : 'bg-white border-2 border-teal-500 text-teal-500'
            } text-base text-center cursor-pointer`}
            onClick={() => setDisplay('request')}
          >
            Requests
          </button>
        </div>
        {projectRequestData && display === 'request' && (
          <p className="text-teal-800 text-xl mt-4">{`Your Request status: ${projectRequestData.status}`}</p>
        )}
        {display === 'project' && <ProjectsList role="User" />}
      </div>
      <button
        className="rounded mt-4 px-4 py-2 bg-teal-500 text-white text-lg font-semibold"
        onClick={() => setShowModal(true)}
      >
        Join a Project
      </button>
    </>
  )
}
