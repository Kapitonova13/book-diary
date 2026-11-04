import { useParams, useNavigate } from 'react-router-dom'
import { useBooks } from '@/context/BooksContext.jsx'
import { SHELVES, getShelfLabel } from '@/data/shelves.js'
import BookGrid from '@/components/BookGrid/BookGrid.jsx'
import './ShelfPage.scss'

function ShelfPage() {
  const { status } = useParams()
  const { state } = useBooks()
  const navigate = useNavigate()

  const valid = SHELVES.some((s) => s.id === status)

  if (!valid) {
    return (
      <div className="shelf-page">
        <p>Такой полки нет.</p>
        <button className="btn btn--primary" onClick={() => navigate('/')}>
          На главную
        </button>
      </div>
    )
  }

  const books = state.books.filter((b) => b.status === status)

  return (
    <div className="shelf-page">
      <h1 className="shelf-page__title">{getShelfLabel(status)}</h1>
      <p className="shelf-page__count">Книг: {books.length}</p>
      <BookGrid books={books} />
    </div>
  )
}

export default ShelfPage