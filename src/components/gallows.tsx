import React from 'react'
import '../css/tailwind.css'

export const Gallows: React.FC = ({ children }) => {
  return (
    <div className="flex w-52 h-60 relative justify-center">
      <div className="w-28 border-t-4 border-yellow-800" />
      <div className="flex absolute h-20 w-20 flex-col justify-center items-center left-6">
        <div className="border-l-2 border-yellow-500 h-10" />
        <div className="z-30 rounded-full border-2 border-yellow-500 w-10 h-12" />
        <div className="absolute top-9 transform scale-90">{children}</div>
      </div>
      <div className="h-56 border-l-4 border-yellow-800" />
      <div className="h-11 transform -rotate-45 border-l-2 right-16 -top-1 absolute border-yellow-800" />
      <div className="w-28 border-t-4 border-yellow-800 absolute bottom-0 left-1/2 transform -translate-x-4/4" />
      <div className="w-28 border-t-4 border-gray-600 absolute -bottom-1 left-1/2 transform -translate-x-4/4" />
    </div>
  )
}
