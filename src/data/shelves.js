export const SHELVES = [
  { id: 'want', label: 'Хочу прочитать', color: '#edbe7b' },
  { id: 'reading', label: 'Читаю', color: '#8bccdf' },
  { id: 'read', label: 'Прочитано', color: '#9bd79b' },
  { id: 'dropped', label: 'Брошено', color: '#f49491' },
]

export const getShelfLabel = (status) =>
  SHELVES.find((s) => s.id === status)?.label ?? 'Без статуса'