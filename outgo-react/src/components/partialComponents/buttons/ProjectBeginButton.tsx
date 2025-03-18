import { useNavigate } from 'react-router-dom'

export default function ProjectBeginButton() {
  const navigate = useNavigate()

  function handleClick() {
    navigate('/project')
  }

  return (
    <button
      className="rounded mt-4 px-4 py-2 bg-teal-500 text-white text-lg font-semibold cursor-pointer"
      onClick={() => handleClick()}
    >
      Begin
    </button>
  )
}
