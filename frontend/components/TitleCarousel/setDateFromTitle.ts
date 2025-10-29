import { FilterType } from "@/context/FilterContext";

export const setDateFromTitle = (index: number, titles: string[], filter: FilterType, setDate: (date: Date) => void, currentDate: Date) => {
  if (!titles || !titles[index]) return;

  const title = titles[index];
  if (!title) return;

  if (filter === "yearly") {
    setDate(new Date(title));
  } else if (filter === "weekly") {
    const weekParts = title.split(".");
    if (weekParts.length < 1) return;

    let week = weekParts[0];
    if (!week) return;

    const weekDateParts = week.split("/");
    if (weekDateParts.length < 2) return;

    const date = new Date(
      currentDate.getFullYear(),
      Number(weekDateParts[1]) - 1,
      Number(weekDateParts[0])
    );
    setDate(date);
  } else {
    const monthParts = title.split(".");
    if (monthParts.length < 1) return;

    let month = Number(monthParts[0]);
    if (isNaN(month)) return;

    const date = new Date(currentDate.getFullYear(), month - 1, 1);
    setDate(date);
  }
};
