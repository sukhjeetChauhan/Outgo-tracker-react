import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../Redux/store'
import { useCreateProjectJoinRequest } from '../../../apis/ProjectJoinRequest/useProjectJoinRequest'
import { Status } from '../../../Types/enums'
import { message } from 'antd'
import CloseModalButton from '../buttons/CloseModalButton'
import { ProjectRepository } from '../../../apis/Project/ProjectRepository'

export default function ProjectJoinRequestForm({
  setShowModal,
}: {
  setShowModal: (show: boolean) => void
}) {
  const [projectName, setProjectName] = useState('')
  const [value, setValue] = useState('')
  const [projectId, setProjectId] = useState<number | null>(null)
  const { id, firstName, lastName } = useSelector(
    (state: RootState) => state.user
  )

  const { mutate: sendRequest } = useCreateProjectJoinRequest()

  useEffect(() => {
    async function fetchProjectByName() {
      if (projectName) {
        try {
          const result = await ProjectRepository.getByName(projectName)

          if (result) {
            // Handle the result of the project search
            return setProjectId(result)
          }
        } catch (error) {
          // Handle the case where no project is found
          console.log(error, 'No project found with that name')
          return setProjectId(-1)
        }
      }
    }
    fetchProjectByName()
  }, [projectName])

  function handleJoinProject() {
    const postData = {
      projectId: projectId,
      userId: id,
      userName: `${firstName} ${lastName}`,
      status: 'Pending' as Status,
    }
    sendRequest(postData, {
      onSuccess: () => {
        console.log('Project join request sent successfully')
        message.success('Project join request sent successfully')
        setShowModal(false)
        setProjectId(null)
        setProjectName('')
        setValue('')
      },
      onError: (error) => {
        console.error('Error sending project join request:', error)
      },
    })
  }

  return (
    <div className="h-full w-full bg-gray-100/90 absolute top-0 left-0 flex flex-col gap-8 items-center rounded pt-10">
      <p className="text-lg font-semibold text-teal-700">
        Type in project name to add
      </p>
      <div className="flex gap-4 items-center justify-center">
        <input
          value={value}
          placeholder="Project Name"
          className="p-2 border-2 border-gray-400 rounded"
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          className="rounded px-4 py-2 bg-teal-500 text-white text-lg font-semibold cursor-pointer"
          onClick={() => {
            setProjectName(value)
            setValue('')
          }}
        >
          Search
        </button>
        <CloseModalButton
          CloseFunction={() => {
            setShowModal(false)
            setProjectId(null)
            setProjectName('')
            setValue('')
          }}
        />
      </div>
      {projectName !== '' && (
        <div className="flex items-center justify-center gap-4">
          <p className="text-lg font-semibold text-teal-700">
            {projectId && projectId !== -1
              ? `Found Project: ${projectName}`
              : 'No project found with that Name'}
          </p>
          {projectId && projectId !== -1 && (
            <button
              className="rounded px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white text-lg font-semibold cursor-pointer"
              onClick={() => handleJoinProject()}
            >
              Join Project
            </button>
          )}
        </div>
      )}
    </div>
  )
}
