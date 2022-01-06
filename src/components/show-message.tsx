import React, { useEffect } from 'react'
import '../css/tailwind.css'

export const ShowMessage: React.FC<{
  msg: string
  type: string
  setStateFn: (value: any) => void
}> = ({ msg, type, setStateFn }) => {
  useEffect(() => {
    setTimeout(() => {
      setStateFn(null)
      console.log(type)
    }, 1000)
  })

  return (
    <div className="z-40 absolute h-screen w-screen flex items-baseline justify-center">
      <div
        className={`
        px-12
        py-8
        z-50
        ${type === 'win' ? 'bg-green-400' : ''}
        ${type === 'lost' ? 'bg-red-400' : ''}
        ${type === 'warning' ? 'bg-yellow-400' : ''}
      `}
      >
        <h1 className="text-3xl text-gray-700">{msg}</h1>
      </div>
    </div>
  )
}
