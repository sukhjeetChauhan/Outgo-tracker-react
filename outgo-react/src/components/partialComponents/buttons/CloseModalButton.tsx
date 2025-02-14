interface CloseModalButtonProps {
  CloseFunction: () => void
}

export default function CloseModalButton({
  CloseFunction,
}: CloseModalButtonProps) {
  return (
    <button
      className="px-[7px] py-[1px] rounded-full bg-white text-teal-300 text-2xl font-bold hover:bg-gray-100 absolute right-4 top-4 text-center cursor-pointer"
      onClick={() => CloseFunction()}
    >
      X
    </button>
  )
}
