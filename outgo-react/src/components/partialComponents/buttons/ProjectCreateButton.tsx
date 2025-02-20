interface ProjectCreateButtonProps {
  showForm: (value: boolean) => void
  setShowModal: (value: boolean) => void
}

export default function ProjectCreateButton({
  showForm,
  setShowModal,
}: ProjectCreateButtonProps) {
  return (
    <button
      className="rounded mt-4 px-4 py-2 bg-teal-500 text-white text-lg font-semibold"
      onClick={() => {
        showForm(true)
        setShowModal(true)
      }}
    >
      Create a Project
    </button>
  )
}
