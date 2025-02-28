const menubarItems = [
  { name: 'Dashboard', path: '/', icon: '/dashboard-logo.png' },
  { name: 'Project', path: '/project', icon: '/project-logo.png' },
  { name: 'Expense', path: '/expense', icon: '/expense-logo.png' },
  { name: 'Income', path: '/income', icon: '/income-logo.png' },
]

export default function Menubar({ retractMenu }: { retractMenu: boolean }) {
  return (
    <div className="flex flex-col items-center my-4 gap-4">
      {menubarItems.map((item, index) => {
        return (
          <a href={item.path} key={index}>
            <div className="flex items-center py-2 px-8">
              <div className="px-4">
                <img src={item.icon} alt="dashboard" className="w-8 h-8" />
              </div>
              <div
                className={`${
                  retractMenu ? 'w-0' : 'w-44 px-4'
                } transition-all duration-500 ease-in-out overflow-hidden`}
              >
                <p className="text-white font-semibold text-xl">{item.name}</p>
              </div>
            </div>
          </a>
        )
      })}
    </div>
  )
}
