export const getItemsSlice = <T>(
  items: T[],
  page: number,
  itemsPerPage: number = 50,
): T[] => {
  const startIndex = page === 0 ? 0 : (page - 1) * itemsPerPage;
  const needEnd = page * itemsPerPage;
  const endIndex = items.length < needEnd ? items.length - 1 : needEnd;
  return items.slice(startIndex, endIndex);
};

export const formatDate = (date: string) => {
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const d = new Date(date);
  return `${monthNames[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
};
