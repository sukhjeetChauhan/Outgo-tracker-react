interface ExpenseDashboardButtonProps {
  showForm: (value: boolean) => void
  setShowModal: (value: boolean) => void
}

export default function ExpenseDashboardButton({
  showForm,
  setShowModal,
}: ExpenseDashboardButtonProps) {
  return (
    <button
      className="bg-red-400 px-4 py-2 rounded text-white text-lg cursor-pointer"
      onClick={() => {
        showForm(true)
        setShowModal(true)
      }}
    >
      Add Expense
    </button>
  )
}
