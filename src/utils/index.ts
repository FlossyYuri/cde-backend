export const addYear = (currentDate: Date, years = 1) => {
  return new Date(
    currentDate.getFullYear() + years,
    currentDate.getMonth(),
    currentDate.getDate(),
  );
};
