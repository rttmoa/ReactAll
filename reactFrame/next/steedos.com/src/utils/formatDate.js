import tinytime from 'tinytime'




// formatDate('2023-06-12 21:21', '{h}:{mm}:{ss}:{a}')
// formatDate('2023-06-12 21:21', '{dddd}, {MMMM} {DD}, {YYYY}')
export function formatDate(date, format) {
  return tinytime(format)
    .render(typeof date === 'string' ? new Date(date) : date)
    .replace('Febuary', 'February')
}
