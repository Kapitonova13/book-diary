import { memo } from 'react'
import { SHELVES } from '@/data/shelves.js'
import './Filters.scss'

function Filters({
  search,
  onSearch,
  status,
  onStatus,
  sort,
  onSort
}) {
  return (
    <div className="filters">
      <input
        type="search"
        className="filters__search"
        placeholder="Поиск по названию или автору..."
        value={search}
        onChange={(e) => onSearch(e.target.value)}
      />

      <select
        className="filters__select"
        value={status}
        onChange={(e) => onStatus(e.target.value)}
      >
        <option value="all">Все статусы</option>
        {SHELVES.map((s) => (
          <option key={s.id} value={s.id}>{s.label}</option>
        ))}
      </select>

      <select
        className="filters__select"
        value={sort}
        onChange={(e) => onSort(e.target.value)}
      >
        <option value="newest">Сначала новые</option>
        <option value="oldest">Сначала старые</option>
        <option value="rating">По оценке</option>
        <option value="title">По названию</option>
      </select>
    </div>
  )
}

export default memo(Filters)
