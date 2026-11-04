import { NavLink, Outlet } from 'react-router-dom'
import { SHELVES } from '@/data/shelves.js'
import './Layout.scss'

function Layout() {
  return (
    <div className="layout">
      <header className="layout__header">
        <NavLink to="/" className="layout__logo">Book Diary</NavLink>
        <nav className="layout__nav">
          <NavLink to="/" end className="layout__link">Библиотека</NavLink>
          {SHELVES.map((s) => (
            <NavLink
              key={s.id}
              to={`/shelf/${s.id}`}
              className="layout__link"
            >
              {s.label}
            </NavLink>
          ))}
        </nav>
        <div className='layout__end'>
          <NavLink to="/quotes" className="layout__quote">Цитаты</NavLink>
          <NavLink to="/stats" className="layout__stats">Статистика</NavLink>
        </div>
      </header>

      <main className="layout__main">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout