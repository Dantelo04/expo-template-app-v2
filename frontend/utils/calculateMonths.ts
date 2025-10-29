import { monthNamesEn, monthNamesEs } from "@/assets/data/constants";
import { FilterType } from "@/context/FilterContext";
import { Record } from "@/lib/actions/createRecord";

export const calculateMonths = (records: Record[], range: FilterType, lang?: string): string[] => {
  const currentYear = new Date().getFullYear();

  if (!records || !Array.isArray(records)) {
    return [];
  }
  
  const filteredRecords = records.filter(
    (record) => !record.title.includes("p.") && !record.title.includes("r.")
  );

  if (filteredRecords.length === 0) {
    return [];
  }

  if (range === "monthly") {
    const monthSet = new Set<number>();

    filteredRecords.forEach((record) => {
      const date = new Date(record.date);
      const month = date.getMonth();
      const year = date.getFullYear();
      if (year === currentYear) {
        monthSet.add(month);
      }
    });

    const monthNames = lang === "es" ? monthNamesEs : monthNamesEn;

    const result: string[] = [];

    Array.from(monthSet).sort((a, b) => a - b).forEach(monthIndex => {
      result.push(monthNames[monthIndex]);
    });

    return result;
  }

  if (range === "weekly") {
    const weekSet = new Set<string>();
    
    filteredRecords.forEach(record => {
      const recordDate = new Date(record.date);
      
      const dayOfWeek = recordDate.getDay();
      const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
      const startOfWeek = new Date(recordDate);
      startOfWeek.setDate(recordDate.getDate() - daysToMonday);
      
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      
      const formatDate = (date: Date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = String(date.getFullYear());
        return date.getFullYear() === currentYear ? `${day}/${month}` : `${day}/${month}/${year}`;
      };
      
      const weekRange = `${formatDate(startOfWeek)}.${formatDate(endOfWeek)}`;
      weekSet.add(weekRange);
    });
    
    const result = Array.from(weekSet).sort((a, b) => {
      const [dayA, monthA] = a.split('.')[0].split('/');
      const [dayB, monthB] = b.split('.')[0].split('/');
      
      const dateA = new Date(2025, parseInt(monthA) - 1, parseInt(dayA));
      const dateB = new Date(2025, parseInt(monthB) - 1, parseInt(dayB));
      
      return dateA.getTime() - dateB.getTime();
    });
    
    return result;
  }

  if (range === "yearly") {
    const years = new Set<number>();

    filteredRecords.forEach((record) => {
      const date = new Date(record.date);
      const year = date.getFullYear();
      years.add(year);
    });

    const sortedYears = Array.from(years).sort((a, b) => a - b);
    return sortedYears.map(year => year.toString());
  }

  return [];
};
