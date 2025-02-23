import { useDispatch, useSelector } from 'react-redux'
import { setDefaultProjectId } from '../../../Redux/Slices/userSlice'
import { useUpdateUser } from '../../../apis/Users/useUsers'
import { RootState } from '../../../Redux/store'

interface ProjectSwitchButtonProps {
  id: number
}

export default function ProjectSwitchButton({ id }: ProjectSwitchButtonProps) {
  const dispatch = useDispatch()
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
  const { mutate: updateUser } = useUpdateUser()

  function assignDefaultProject(projectId: number): void {
    dispatch(setDefaultProjectId(projectId))
    if (userId) {
      updateUser({
        id: userId,
        user: {
          id: userId,
          firstName: firstName,
          lastName: lastName,
          email: '',
          phoneNumber: '',
          defaultProjectId: projectId,
        },
      })
    }
  }

  return (
    <>
      {id === defaultProjectId ? (
        <p className="text-lg text-teal-500 py-2 px-4 mr-2 font-semibold">
          Default
        </p>
      ) : (
        <button
          className="rounded mt-4 px-4 py-2 bg-teal-500 text-white text-lg font-semibold cursor-pointer mr-2"
          onClick={() => assignDefaultProject(id)}
        >
          Switch
        </button>
      )}
    </>
  )
}
