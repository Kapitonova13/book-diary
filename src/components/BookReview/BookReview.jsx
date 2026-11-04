import { useState, useEffect } from 'react'
import { useDebounce } from '@/hooks/useDebounce.js'

function BookReview({ book, update }) {
  const [localReview, setLocalReview] = useState(book.review || '')
  const debouncedReview = useDebounce(localReview, 500)

  useEffect(() => {
    if (debouncedReview !== book.review) {
      update({ review: debouncedReview })
    }
  }, [debouncedReview])

  return (
    <div className="book-page__section">
      <h2>Отзыв</h2>
      <textarea
        className="book-page__review"
        rows={6}
        value={localReview}
        placeholder="Что ты думаешь об этой книге?"
        onChange={(e) => setLocalReview(e.target.value)}
      />
    </div>
  )
}

export default BookReview