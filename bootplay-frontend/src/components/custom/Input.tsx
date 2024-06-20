import React from 'react'

interface Props {
  children: React.ReactNode,
  type: string,
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Input2({ children, type, onChange } : Props) {
  return (
    <>
      <label htmlFor={type} className="text-sm font-normal">{children}</label>
      <input type={type} required onChange={onChange} className="bg-zinc-50 p-2 rounded-md ring-1 ring-zinc-900/20 mb-3" />
    </>
  )
}