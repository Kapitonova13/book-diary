import { useState } from 'react'
import Modal from '@/components/Modal/Modal.jsx'
import StarRating from '@/components/StarRating/StarRating.jsx'
import { SHELVES } from '@/data/shelves.js'
import { validateBook } from '@/utils/validators.js'
import { useBooks } from '@/context/BooksContext.jsx'
import './AddBookModal.scss'
import { useEffect } from 'react'

const emptyForm = {
  title: '',
  author: '',
  status: 'want',
  rating: 0,
  review: '',
  finishedAt: '',  
  coverUrl: '',
}

function AddBookModal({ isOpen, onClose }) {
  const { dispatch } = useBooks()
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  
  useEffect(()=>{
    if (!isOpen) {
      setForm(emptyForm)
      setErrors({})
      setTouched({})
    }
  }, [isOpen])

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (touched[field]) {
      setErrors(validateBook({ ...form, [field]: value }))
    }
  }

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
    setErrors(validateBook(form))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const nextErrors = validateBook(form)
    setErrors(nextErrors)
    setTouched({ title: true, author: true, rating: true })

    if (Object.keys(nextErrors).length > 0) return

    dispatch({
      type: 'ADD_BOOK',
      payload: {
        id: crypto.randomUUID(),
        title: form.title.trim(),
        author: form.author.trim(),
        status: form.status,
        rating: Number(form.rating) || 0,
        review: form.review.trim(),
        quotes: [],
        tags: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        coverUrl: form.coverUrl.trim(), 
        finishedAt: form.finishedAt
          ? new Date(form.finishedAt).toISOString() 
          : null
      },
    })

    setForm(emptyForm)
    setErrors({})
    setTouched({})
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="add-book__title">Добавить книгу</h2>
      <form className="add-book" onSubmit={handleSubmit} noValidate>
        <label className="add-book__field">
          <span>Название *</span>
          <input
            type="text"
            value={form.title}
            onChange={(e) => handleChange('title', e.target.value)}
            onBlur={() => handleBlur('title')}
            className={errors.title ? 'is-invalid' : ''}
          />
          {errors.title && <small className="add-book__error">{errors.title}</small>}
        </label>

        <label className="add-book__field">
          <span>Автор</span>
          <input
            type="text"
            value={form.author}
            onChange={(e) => handleChange('author', e.target.value)}
            onBlur={() => handleBlur('author')}
            className={errors.author ? 'is-invalid' : ''}
          />
          {errors.author && <small className="add-book__error">{errors.author}</small>}
        </label>

        <label className="add-book__field">
          <span>Статус</span>
          <select
            value={form.status}
            onChange={(e) => handleChange('status', e.target.value)}
          >
            {SHELVES.map((s) => (
              <option key={s.id} value={s.id}>{s.label}</option>
            ))}
          </select>
        </label>

        {form.status === 'read' && (
          <div className="add-book__field">
            <span>Дата окончания</span>
            <input 
              type="date"
              value={form.finishedAt || ''}
              onChange={(e) => handleChange('finishedAt', e.target.value)}
              onBlur={() => handleBlur('finishedAt')}
              max={new Date().toISOString().slice(0, 10)}
              className={errors.finishedAt ? 'is-invalid' : ''}
            />
            {errors.finishedAt && <small className="add-book__error">{errors.finishedAt}</small>}
          </div>
        )}

        <div className="add-book__field">
          <span>Оценка</span>
          <StarRating
            value={form.rating}
            onChange={(v) => handleChange('rating', v)}
          />
          {errors.rating && <small className="add-book__error">{errors.rating}</small>}
        </div>

        <label className="add-book__field">
          <span>Отзыв</span>
          <textarea
            rows={4}
            value={form.review}
            onChange={(e) => handleChange('review', e.target.value)}
          />
        </label>

        <div className="add-book__actions">
          <button type="button" className="btn btn--ghost" onClick={onClose}>
            Отмена
          </button>
          <button type="submit" className="btn btn--primary">
            Добавить
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default AddBookModal