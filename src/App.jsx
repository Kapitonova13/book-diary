import { Routes, Route } from 'react-router-dom'
import Layout from '@/components/Layout/Layout.jsx'
import LibraryPage from '@/pages/LibraryPage/LibraryPage.jsx'
import BookPage from '@/pages/BookPage/BookPage.jsx'
import ShelfPage from '@/pages/ShelfPage/ShelfPage.jsx'
import StatsPage from '@/pages/StatsPage/StatsPage.jsx'
import NotFoundPage from '@/pages/NotFoundPage/NotFoundPage.jsx'
import QuotesPage from '@/pages/QuotesPage/QuotesPage.jsx'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<LibraryPage />} />
        <Route path="/book/:id" element={<BookPage />} />
        <Route path="/shelf/:status" element={<ShelfPage />} />
        <Route path="/quotes" element={<QuotesPage />} />
        <Route path="/stats" element={<StatsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App