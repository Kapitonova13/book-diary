import { memo } from 'react'
import { Link } from 'react-router-dom'
import { getShelfLabel } from '@/data/shelves.js'
import StarRating from '@/components/StarRating/StarRating.jsx'
import './BookCard.scss'

function BookCard({ book }) {
  return (
    <Link to={`/book/${book.id}`} className="book-card">
      <div className="book-card__cover">
        {book.coverUrl ? (
          <img src={book.coverUrl} alt={book.title} />
        ) : (
          <span className="book-card__placeholder">📖</span>
        )}
      </div>
      <div className="book-card__body">
        <h3 className="book-card__title">{book.title}</h3>
        <p className="book-card__author">{book.author || 'Автор не указан'}</p>
        <span className={`book-card__badge book-card__badge--${book.status}`}>
          {getShelfLabel(book.status)}
        </span>
        {book.rating > 0 && <StarRating value={book.rating} readOnly />}
      </div>
    </Link>
  )
}

export default memo(BookCard)