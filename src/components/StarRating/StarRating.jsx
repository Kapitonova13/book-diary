import './StarRating.scss'

function StarRating({ value = 0, onChange, readOnly = false }) {
  return (
    <div className={`stars ${readOnly ? 'stars--readonly' : ''}`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          className={`stars__star ${n <= value ? 'stars__star--filled' : ''}`}
          onClick={() => !readOnly && onChange?.(n === value ? 0 : n)}
          aria-label={`Оценка ${n}`}
          disabled={readOnly}
        >
          ★
        </button>
      ))}
    </div>
  )
}

export default StarRating