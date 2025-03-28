interface IncomeDashboardButtonProps {
  showForm: (value: boolean) => void
  setShowModal: (value: boolean) => void
}

export default function IncomeDashboardButton({
  showForm,
  setShowModal,
}: IncomeDashboardButtonProps) {
  return (
    <button
      className="bg-yellow-400 px-4 py-2 rounded text-white text-lg cursor-pointer"
      onClick={() => {
        showForm(true)
        setShowModal(true)
      }}
    >
      Add Income
    </button>
  )
}
