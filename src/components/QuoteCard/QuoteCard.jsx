import { Link } from 'react-router-dom'
import './QuoteCard.scss'

function QuoteCard({ quote, book, showBookLink = false, onEdit, onDelete }) {
  return (
    <article className="quote-card">
      {showBookLink && book && (
        <Link to={`/book/${book.id}`} className="quote-card__book">
          {book.title}
        </Link>
      )}

      <blockquote className="quote-card__text">{quote.text}</blockquote>

      {(quote.chapter || quote.page != null) && (
        <div className="quote-card__meta">
          {quote.chapter && <span>Глава: {quote.chapter}</span>}
          {quote.page != null && <span>Стр.: {quote.page}</span>}
        </div>
      )}

      {(onEdit || onDelete) && (
        <div className="quote-card__actions">
          {onEdit && (
            <button className="btn btn--ghost" onClick={() => onEdit(quote)}>
              Редактировать
            </button>
          )}
          {onDelete && (
            <button
              className="btn btn--danger"
              onClick={() => onDelete(quote.id)}
            >
              Удалить
            </button>
          )}
        </div>
      )}
    </article>
  )
}

export default QuoteCard