import { createContext, useContext, useReducer, useEffect } from 'react'
import { useLocalStorage } from '@/hooks/useLocalStorage.js'

const BooksContext = createContext(null)

const initialState = { books: [] }

function booksReducer(state, action) {
  switch (action.type) {
    case 'ADD_BOOK':
      return { ...state, books: [...state.books, action.payload] }
    case 'UPDATE_BOOK':
      return {
        ...state,
        books: state.books.map((b) =>
          b.id === action.payload.id ? { ...b, ...action.payload } : b
        ),
      }
    case 'DELETE_BOOK':
      return { ...state, books: state.books.filter((b) => b.id !== action.id) }
    default:
      return state
  }
}

export function BooksProvider({ children }) {
  const [saved, setSaved] = useLocalStorage('book-diary:books', initialState)
  const [state, dispatch] = useReducer(booksReducer, saved)

  // синхронизируем state → localStorage
  useEffect(() => {
    setSaved(state)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state])

  return (
    <BooksContext.Provider value={{ state, dispatch }}>
      {children}
    </BooksContext.Provider>
  )
}

export function useBooks() {
  const ctx = useContext(BooksContext)
  if (!ctx) throw new Error('useBooks must be used within BooksProvider')
  return ctx
}