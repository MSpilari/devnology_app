const usePaginationControls = (totalPages: number, currentPage: number) => {
  const visiblePages = Array.from(
    { length: totalPages },
    (_, i) => i + 1
  ).slice(Math.max(0, currentPage - 3), currentPage + 2);

  return {
    visiblePages,
  };
};

export { usePaginationControls };
