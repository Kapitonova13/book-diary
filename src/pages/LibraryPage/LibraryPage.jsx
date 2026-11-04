import { useState, useMemo, useCallback } from 'react'
import { useBooks } from '@/context/BooksContext.jsx'
import { useDebounce } from '@/hooks/useDebounce.js'

import BookGrid from '@/components/BookGrid/BookGrid.jsx'
import Filters from '@/components/Filters/Filters.jsx'
import AddBookModal from '@/components/AddBookModal/AddBookModal.jsx'
import './LibraryPage.scss'

function LibraryPage() {
  const { state } = useBooks()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all')
  const [sort, setSort] = useState('newest')

  const debouncedSearch = useDebounce(search, 300)

  const filteredBooks = useMemo(() => {
    const q = debouncedSearch.trim().toLowerCase()
    let result = state.books

    if (status !== 'all') {
      result = result.filter((b) => b.status === status)
    }

    if (q) {
      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          (b.author || '').toLowerCase().includes(q)
      )
    }

    const sorted = [...result]
    switch (sort) {
      case 'oldest':
        sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
        break
      case 'rating':
        sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0))
        break
      case 'title':
        sorted.sort((a, b) => a.title.localeCompare(b.title, 'ru'))
        break
      default:
        sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    }

    return sorted
  }, [state.books, debouncedSearch, status, sort])

  const handleSearch = useCallback((v) => setSearch(v), [])
  const handleStatus = useCallback((v) => setStatus(v), [])
  const handleSort = useCallback((v) => setSort(v), [])

  return (
    <div className="library">
      <div className="library__top">
        <h1 className="library__title">Моя библиотека</h1>
        <button
          className="btn btn--primary"
          onClick={() => setIsModalOpen(true)}
        >
          + Добавить книгу
        </button>
      </div>

      <Filters
        search={search}
        onSearch={handleSearch}
        status={status}
        onStatus={handleStatus}
        sort={sort}
        onSort={handleSort}
      />

      <BookGrid books={filteredBooks} totalBooks={state.books.length} />

      <AddBookModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}

export default LibraryPage