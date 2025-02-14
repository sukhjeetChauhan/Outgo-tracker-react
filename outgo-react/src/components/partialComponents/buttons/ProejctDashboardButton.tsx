interface ProjectDashboardButtonProps {
  showForm: (value: boolean) => void
  setShowModal: (value: boolean) => void
}

export default function ProjectDashboardButton({
  showForm,
  setShowModal,
}: ProjectDashboardButtonProps) {
  return (
    <button
      className="rounded mt-4 px-4 py-2 bg-gray-500 text-white text-lg font-semibold"
      onClick={() => {
        showForm(true)
        setShowModal(true)
      }}
    >
      Create a Project
    </button>
  )
}
