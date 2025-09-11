'use client'

import { Trash2 } from 'lucide-react'
import { useFormStatus } from 'react-dom'

interface DeleteFormProps {
  action: () => void
  confirmMessage: string
}

function SubmitButton({ confirmMessage }: { confirmMessage: string }) {
  const { pending } = useFormStatus()

  const handleClick = (e: React.MouseEvent) => {
    if (!confirm(confirmMessage)) {
      e.preventDefault()
    }
  }

  return (
    <button
      type="submit"
      onClick={handleClick}
      disabled={pending}
      className="inline-flex items-center p-2 border border-gray-300 rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <Trash2 className={`h-4 w-4 ${pending ? 'animate-spin' : ''}`} />
    </button>
  )
}

export function DeleteForm({ action, confirmMessage }: DeleteFormProps) {
  return (
    <form action={action} className="inline">
      <SubmitButton confirmMessage={confirmMessage} />
    </form>
  )
}