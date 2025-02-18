export default function UserLabelDashboard({
  firstName,
  lastName,
}: {
  firstName: string
  lastName: string
}) {
  return (
    <div className="flex items-center px-4 py-2 rounded-full bg-gray-400">
      <div className="text-base font-medium text-gray-900">
        {firstName} {lastName}
      </div>
    </div>
  )
}
