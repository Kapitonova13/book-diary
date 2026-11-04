import { useParams, Link, useNavigate } from 'react-router-dom'
import { useBooks } from '@/context/BooksContext.jsx'
import { SHELVES } from '@/data/shelves.js'
import StarRating from '@/components/StarRating/StarRating.jsx'
import './BookPage.scss'
import BookReview from '@/components/BookReview/BookReview.jsx'
import AddQuoteModal from '@/components/AddQuoteModal/AddQuoteModal.jsx'
import { useState } from 'react'
import QuoteCard from '@/components/QuoteCard/QuoteCard.jsx'

function BookPage() {
  const { id } = useParams()
  const { state, dispatch } = useBooks()
  const navigate = useNavigate()

  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false)
  const [editingQuote, setEditingQuote] = useState(null)

  const book = state.books.find((b) => b.id === id)


  if (!book) {
    return (
      <div className="book-page book-page--missing">
        <p>Книга не найдена.</p>
        <Link to="/" className="btn btn--primary">← Вернуться в библиотеку</Link>
      </div>
    )
  }

  const update = (patch) =>
    dispatch({
      type: 'UPDATE_BOOK',
      payload: { id: book.id, ...patch, updatedAt: new Date().toISOString() },
    })

  const handleDelete = () => {
    if (window.confirm('Удалить эту книгу?')) {
      dispatch({ type: 'DELETE_BOOK', id: book.id })
      navigate('/')
    }
  }

  const addQuote = (quote) => {
    update({ quotes: [...(book.quotes || []), quote] })
  }

  const saveQuote = (quote) => {
    update({
      quotes: (book.quotes || []).map((q) => (q.id === quote.id ? quote : q)),
    })
  }

  const deleteQuote = (quoteId) => {
    if (window.confirm('Удалить цитату?')) {
      update({ quotes: (book.quotes || []).filter((q) => q.id !== quoteId) })
    }
  }

  return (
    <div className="book-page">
      <Link to="/" className="book-page__back">← Назад</Link>

      <div className="book-page__header">
        <div className="book-page__cover">
          {book.coverUrl ? (
            <img src={book.coverUrl} alt={book.title} />
          ) : (
            <span className="book-page__placeholder">📖</span>
          )}
        </div>

        <div className="book-page__info">
          <h1 className="book-page__title">{book.title}</h1>
          <p className="book-page__author">{book.author || 'Автор не указан'}</p>

          <div className="book-page__row">
            <span className="book-page__label">Статус:</span>
            <select
              className="book-page__select"
              value={book.status}
              onChange={(e) => update({ status: e.target.value })}
            >
              {SHELVES.map((s) => (
                <option key={s.id} value={s.id}>{s.label}</option>
              ))}
            </select>
          </div>

          <div className="book-page__row">
            <span className="book-page__label">Оценка:</span>
            <StarRating
              value={book.rating || 0}
              onChange={(rating) => update({ rating })}
            />
          </div>

          <div className="book-page__dates">
            <span>Добавлена: {new Date(book.createdAt).toLocaleDateString('ru')}</span>
            {book.finishedAt && (
              <span>Прочитана: {new Date(book.finishedAt).toLocaleDateString('ru')}</span>
            )}
          </div>
          <div className="book-page__row">
            <span className="book-page__label">Обложка (URL):</span>
            <input
              type="url"
              className="book-page__input"
              placeholder="https://..."
              value={book.coverUrl || ''}
              onChange={(e) => update({ coverUrl: e.target.value.trim() })}
            />
          </div>
        </div>
      </div>

      <BookReview book={book} update={update} />

      <div className="book-page__section">
        <div className="book-page__section-header">
          <h2>Цитаты</h2>
          <button
            className="btn btn--primary"
            onClick={() => {
              setEditingQuote(null)
              setIsQuoteModalOpen(true)
            }}
          >
            + Добавить цитату
          </button>
        </div>

        {(book.quotes || []).length === 0 ? (
          <p className="book-page__quotes-empty">Пока нет цитат. Добавь первую!</p>
        ) : (
          <ul className="book-page__quotes">
            {(book.quotes || []).map((q) => (
              <li key={q.id}>
                <QuoteCard
                  quote={q}
                  onEdit={(quote) => {
                    setEditingQuote(quote)
                    setIsQuoteModalOpen(true)
                  }}
                  onDelete={deleteQuote}
                />
              </li>
            ))}
          </ul>
        )}
      </div>

      <AddQuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        onSave={editingQuote ? saveQuote : addQuote}
        initialQuote={editingQuote}
      />

      <button className="btn btn--danger" onClick={handleDelete}>
        Удалить книгу
      </button>
    </div>
  )
}

export default BookPage