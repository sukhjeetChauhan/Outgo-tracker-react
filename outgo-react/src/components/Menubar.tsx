const menubarItems = [
  { name: 'Dashboard', path: '/', icon: 'X' },
  { name: 'Project', path: '/project', icon: 'X' },
  { name: 'Expense', path: '/expense', icon: 'X' },
  { name: 'Income', path: '/income', icon: 'X' },
]

export default function Menubar({ retractMenu }: { retractMenu: boolean }) {
  return (
    <div className="flex flex-col items-center my-4 gap-4">
      {menubarItems.map((item, index) => {
        return (
          <a href={item.path} key={index}>
            <div className="flex items-center py-2 px-8">
              <div className="px-4">
                <span>{item.icon}</span>
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
