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

export const sortDates = (d1: Date, d2: Date) => {};
