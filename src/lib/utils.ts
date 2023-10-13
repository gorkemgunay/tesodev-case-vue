export const getRandomDate = () => {
  const randomDay = Math.floor(Math.random() * 31) + 1;
  const randomMonth = Math.floor(Math.random() * 12) + 1;
  const year = 2023;

  const formattedDate = `${randomDay.toString().padStart(2, "0")}/${randomMonth
    .toString()
    .padStart(2, "0")}/${year}`;

  return formattedDate;
};

export const parseDate = (dateString: string) => {
  const parts = dateString.split("/");
  const day = parseInt(parts[0]);
  const month = parseInt(parts[1]) - 1;
  const year = parseInt(parts[2]);
  return new Date(year, month, day);
};
