'use client'

interface ConfirmDeleteButtonProps {
  children: React.ReactNode
  confirmMessage: string
  className?: string
  title?: string
  onConfirm: () => void
}

export function ConfirmDeleteButton({ 
  children, 
  confirmMessage, 
  className = "",
  title = "",
  onConfirm
}: ConfirmDeleteButtonProps) {
  const handleClick = () => {
    if (confirm(confirmMessage)) {
      onConfirm()
    }
  }

  return (
    <button
      type="button"
      className={className}
      title={title}
      onClick={handleClick}
    >
      {children}
    </button>
  )
}