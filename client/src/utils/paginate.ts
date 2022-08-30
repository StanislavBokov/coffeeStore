/* eslint-disable @typescript-eslint/no-explicit-any */
export const paginate = (items: any, currentPage: number, pageSize: number) => {
  const startIndex = (currentPage - 1) * pageSize;
  return [...items].splice(startIndex, pageSize);
};