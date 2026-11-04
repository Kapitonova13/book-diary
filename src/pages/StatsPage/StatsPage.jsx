import { useMemo } from 'react'
import { useBooks } from '@/context/BooksContext.jsx'
import { SHELVES } from '@/data/shelves.js'
import './StatsPage.scss'

function StatsPage() {
  const { state } = useBooks()

  const stats = useMemo(() => {
    const books = state.books
    const total = books.length

    const byStatus = SHELVES.map((s) => ({
      ...s,
      count: books.filter((b) => b.status === s.id).length,
    }))

    const rated = books.filter((b) => b.rating > 0)
    const avgRating = rated.length
      ? (rated.reduce((sum, b) => sum + b.rating, 0) / rated.length).toFixed(1)
      : '—'

    const withReview = books.filter((b) => (b.review || '').trim()).length

    const now = new Date()
    const thisMonth = books.filter((b) => {
      if (!b.createdAt) return false
      const d = new Date(b.createdAt)
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
    }).length

    return { total, byStatus, avgRating, withReview, thisMonth }
  }, [state.books])

  return (
    <div className="stats">
      <h1 className="stats__title">Статистика</h1>

      <div className="stats__cards">
        <div className="stats__card">
          <span className="stats__value">{stats.total}</span>
          <span className="stats__label">Всего книг</span>
        </div>
        <div className="stats__card">
          <span className="stats__value">{stats.avgRating}</span>
          <span className="stats__label">Средняя оценка</span>
        </div>
        <div className="stats__card">
          <span className="stats__value">{stats.withReview}</span>
          <span className="stats__label">С отзывом</span>
        </div>
        <div className="stats__card">
          <span className="stats__value">{stats.thisMonth}</span>
          <span className="stats__label">Добавлено в этом месяце</span>
        </div>
      </div>

      <div className="stats__section">
        <h2>По полкам</h2>
        <div className="stats__bars">
          {stats.byStatus.map((s) => {
            const percent = stats.total ? (s.count / stats.total) * 100 : 0
            return (
              <div key={s.id} className="stats__bar-row">
                <span className="stats__bar-label">{s.label}</span>
                <div className="stats__bar-track">
                  <div
                    className="stats__bar-fill"
                    style={{ width: `${percent}%`, background: s.color }}
                  />
                </div>
                <span className="stats__bar-count">{s.count}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default StatsPage