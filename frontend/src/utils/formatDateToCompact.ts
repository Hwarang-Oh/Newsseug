export function formatDateToCompact(dateString: string): string {
  const regex = /^(\d{4})\.(\d{2})\.(\d{2})$/;
  const match = RegExp(regex).exec(dateString);

  if (match) {
    const [, year, month, day] = match;
    return `${year}${month}${day}`;
  } else {
    throw new Error('Invalid date format. Expected YYYY.MM.DD');
  }
}
