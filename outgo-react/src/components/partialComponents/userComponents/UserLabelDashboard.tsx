export default function UserLabelDashboard({
  firstName,
  lastName,
}: {
  firstName: string
  lastName: string
}) {
  return (
    <div className="flex items-center px-4 py-2 rounded-full bg-white">
      <div className="text-base font-medium text-teal-800">
        {firstName} {lastName}
      </div>
    </div>
  )
}
