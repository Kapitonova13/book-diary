export const validateBook = ({ title, author, rating, status, finishedAt }) => {
  const errors = {}
  console.log('длина', author.trim().length);
  
  if (!title || !title.trim()) {
    errors.title = 'Название обязательно'
  } else if (title.trim().length < 1 || title.trim().length > 500) {
    console.log('!!длина');
    errors.title = 'Название должно быть от 1 до 500 символов'
  }

  if (author && author.trim().length > 100) {
    errors.author = 'Слишком длинное имя автора'
  }

  if (rating !== '' && rating != null) {
    const num = Number(rating)
    if (Number.isNaN(num) || num < 0 || num > 5) {
      errors.rating = 'Оценка может быть от 0 до 5'
    }
  }
  
  if (finishedAt) {
    const date = new Date(finishedAt)

    if (Number.isNaN(date.getTime())) {
      errors.finishedAt = 'Некорректная дата'
    } else {
      const today = new Date().toISOString().slice(0, 10)

      if (today < finishedAt) {
        errors.finishedAt = 'Дата не может быть в будущем'
      }

      const minDate = new Date('1900-01-01').toISOString().slice(0, 10)
      if (minDate > finishedAt) {
        errors.finishedAt = 'Дата слишком старая'
      }
      

    }
  }

  return errors
}