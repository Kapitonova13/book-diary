import { useState, useEffect } from 'react'
import Modal from '@/components/Modal/Modal.jsx'
import './AddQuoteModal.scss'

const emptyForm = { text: '', chapter: '', page: '' }

function AddQuoteModal({ isOpen, onClose, onSave, initialQuote = null }) {
  const [form, setForm] = useState(emptyForm)
  const [error, setError] = useState('')

  useEffect(() => {
    if (isOpen) {
      setForm(
        initialQuote
          ? {
              text: initialQuote.text || '',
              chapter: initialQuote.chapter || '',
              page: initialQuote.page != null ? String(initialQuote.page) : '',
            }
          : emptyForm
      )
      setError('')
    }
  }, [isOpen, initialQuote])

  const handleSubmit = (e) => {
    e.preventDefault()
    const text = form.text.trim()
    if (!text) {
      setError('Текст цитаты обязателен')
      return
    }

    const pageNum = form.page.trim() ? Number(form.page) : null
    if (form.page.trim() && (Number.isNaN(pageNum) || pageNum < 1)) {
      setError('Страница должна быть положительным числом')
      return
    }

    onSave({
      id: initialQuote?.id ?? crypto.randomUUID(),
      text,
      chapter: form.chapter.trim(),
      page: pageNum,
      createdAt: initialQuote?.createdAt ?? new Date().toISOString(),
    })
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="add-quote__title">
        {initialQuote ? 'Редактировать цитату' : 'Добавить цитату'}
      </h2>
      <form className="add-quote" onSubmit={handleSubmit} noValidate>
        <label className="add-quote__field">
          <span>Текст цитаты *</span>
          <textarea
            rows={4}
            value={form.text}
            onChange={(e) => setForm((p) => ({ ...p, text: e.target.value }))}
            className={error && !form.text.trim() ? 'is-invalid' : ''}
          />
        </label>

        <label className="add-quote__field">
          <span>Глава</span>
          <input
            type="text"
            value={form.chapter}
            onChange={(e) => setForm((p) => ({ ...p, chapter: e.target.value }))}
          />
        </label>

        <label className="add-quote__field">
          <span>Страница</span>
          <input
            type="number"
            min="1"
            value={form.page}
            onChange={(e) => setForm((p) => ({ ...p, page: e.target.value }))}
          />
        </label>

        {error && <small className="add-quote__error">{error}</small>}

        <div className="add-quote__actions">
          <button type="button" className="btn btn--ghost" onClick={onClose}>
            Отмена
          </button>
          <button type="submit" className="btn btn--primary">
            {initialQuote ? 'Сохранить' : 'Добавить'}
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default AddQuoteModal