import { Link } from 'react-router-dom'
import './NotFoundPage.scss'

function NotFoundPage() {
  return (
    <div className="not-found">
      <h1>404</h1>
      <p>Такой страницы не существует</p>
      <Link to="/" className="btn btn--primary">← На главную</Link>
    </div>
  )
}

export default NotFoundPage