export const dateParser = (dateStr: string): Date => {
  const parts = dateStr.split(' ')
  const dateParts = parts[0].split('-')
  const timeParts = parts[1].split(':')

  const year = parseInt(dateParts[2], 10)
  const month = parseInt(dateParts[1], 10) - 1
  const day = parseInt(dateParts[0], 10)
  const hour = parseInt(timeParts[0], 10)
  const minute = parseInt(timeParts[1], 10)
  const second = parseInt(timeParts[2], 10)

  return new Date(year, month, day, hour, minute, second)
}
