import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import './Modal.scss'

function Modal({ isOpen, onClose, children }) {
  useEffect(() => {
    if (!isOpen) return
    const onEsc = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onEsc)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onEsc)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return createPortal(
    <div className="modal" onClick={onClose}>
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose} aria-label="Закрыть">✕</button>
        {children}
      </div>
    </div>,
    document.body
  )
}

export default Modal