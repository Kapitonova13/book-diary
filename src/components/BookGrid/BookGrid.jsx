import { memo } from 'react'
import BookCard from '@/components/BookCard/BookCard.jsx'
import './BookGrid.scss'

function BookGrid({ books, totalBooks }) {
  if (!books.length) {
    if (totalBooks === 0) {
      return (
        <div className="book-grid__empty">
          <p>Пока нет книг. Добавь первую!</p>
        </div>
      )
    }
    return (
      <div className="book-grid__empty">
        <p>По вашему запросу ничего не найдено.</p>
      </div>
    )
  }

  return (
    <div className="book-grid">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  )
}

export default memo(BookGrid)
