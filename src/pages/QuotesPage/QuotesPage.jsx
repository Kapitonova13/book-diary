import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useBooks } from '@/context/BooksContext.jsx'
import './QuotesPage.scss'
import QuoteCard from '@/components/QuoteCard/QuoteCard.jsx'

function QuotesPage() {
  const { state } = useBooks()

  // Собираем все цитаты из всех книг + информация о книге
  const allQuotes = useMemo(() => {
    const result = []
    state.books.forEach((book) => {
      ;(book.quotes || []).forEach((q) => {
        result.push({ ...q, book })
      })
    })
    // Сортируем по дате создания — новые сверху (или по книге/главе)
    return result.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    )
  }, [state.books])

  if (!allQuotes.length) {
    return (
      <div className="quotes-page">
        <h1 className="quotes-page__title">Цитаты</h1>
        <div className="quotes-page__empty">
          <p>Пока нет цитат.</p>
          <p className="quotes-page__empty-hint">
            Зайди в книгу и добавь первую цитату.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="quotes-page">
      <h1 className="quotes-page__title">Цитаты</h1>
      <p className="quotes-page__count">Всего: {allQuotes.length}</p>

      <ul className="quotes-page__list">
        {allQuotes.map((q) => (
            <li key={`${q.book.id}-${q.id}`}>
                <QuoteCard quote={q} book={q.book} showBookLink />
            </li>
        ))}
      </ul>
    </div>
  )
}

export default QuotesPage