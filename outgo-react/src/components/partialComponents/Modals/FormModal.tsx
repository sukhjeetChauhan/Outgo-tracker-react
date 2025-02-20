import React from 'react'

export default function FormModal({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-screen bg-gray-400/50 z-100 absolute left-0 top-0 flex items-center justify-center">
      {children}
    </div>
  )
}
