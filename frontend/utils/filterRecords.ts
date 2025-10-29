import { FilterType } from "@/context/FilterContext";
import { Record } from "@/lib/actions/createRecord";
import { getConversions } from "@/lib/actions/getConversions";
import { excludeProRecords } from "./excludeProRecords";

export const getConvertedRecords = async (
  records: Record[],
  date: Date,
  mainCurrency: string,
  filter: FilterType,
  titlesLength: number,
  selectedReportCategories: string[]
) => {
  const conversions = await getConversions(mainCurrency);
  
  const filteredRecords = records.filter(record => 
    record.category && selectedReportCategories.includes(record.category)
  );
  
  const sortedRecords = excludeProRecords(filteredRecords).sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  let currentPeriodRecords: Record[] = [];
  let previousPeriodRecords: Record[] = [];

  if (filter === "monthly") {
    const currentMonth = date.getUTCMonth();
    const currentYear = date.getUTCFullYear();

    currentPeriodRecords = sortedRecords.filter((record) => {
      const recordDate = new Date(record.date);
      return (
        recordDate.getUTCMonth() === currentMonth &&
        recordDate.getUTCFullYear() === currentYear
      );
    });

    const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const previousYear = currentMonth === 0 ? currentYear - 1 : currentYear;

    previousPeriodRecords = sortedRecords.filter((record) => {
      const recordDate = new Date(record.date);
      return (
        recordDate.getUTCMonth() === previousMonth &&
        recordDate.getUTCFullYear() === previousYear
      );
    });
  } else if (filter === "weekly") {
    const currentWeek = getWeekNumber(date);
    const currentYear = date.getFullYear();

    currentPeriodRecords = sortedRecords.filter((record) => {
      const recordDate = new Date(record.date);
      return (
        getWeekNumber(recordDate) === currentWeek &&
        recordDate.getFullYear() === currentYear
      );
    });

    const previousWeek = currentWeek === 1 ? 52 : currentWeek - 1;

    previousPeriodRecords = sortedRecords.filter((record) => {
      const recordDate = new Date(record.date);
      return (
        getWeekNumber(recordDate) === previousWeek &&
        recordDate.getFullYear() === currentYear
      );
    });
  } else if (filter === "yearly") {
    const currentYear = date.getUTCFullYear();

    currentPeriodRecords = sortedRecords.filter((record) => {
      const recordDate = new Date(record.date);
      return recordDate.getUTCFullYear() === currentYear;
    });

    const previousYear = currentYear - 1;

    previousPeriodRecords = sortedRecords.filter((record) => {
      const recordDate = new Date(record.date);
      return recordDate.getUTCFullYear() === previousYear;
    });
  }

  const convertToMainCurrency = (records: Record[]) => {
    return records.map((record) => ({
      ...record,
      amount:
        record.currency !== mainCurrency
          ? record.amount / conversions[record.currency]
          : record.amount,
      currency: mainCurrency,
    }));
  };

  const getAverageSpent = (records: Record[], months: number) => {
    const totalSpent = records.reduce((acc, record) => {
      if (record.type === "expense") {
        return acc + record.amount;
      }
      return acc;
    }, 0);
    return months > 1 ? totalSpent / months : 0;
  };

  const averageSpent = getAverageSpent(records, titlesLength);
  const convertedCurrentPeriod = convertToMainCurrency(currentPeriodRecords);
  const convertedPreviousPeriod = convertToMainCurrency(previousPeriodRecords);


  if (filter === "monthly") {
    return {
      records: convertedCurrentPeriod,
      previousRecords: convertedPreviousPeriod,
      averageSpent: averageSpent,
    };
  } else if (filter === "weekly") {
    return {
      records: convertedCurrentPeriod,
      previousRecords: convertedPreviousPeriod,
      averageSpent: averageSpent,
    };
  } else if (filter === "yearly") {
    return {
      records: convertedCurrentPeriod,
      previousRecords: convertedPreviousPeriod,
      averageSpent: averageSpent,
    };
  }

  return {
    records: convertedCurrentPeriod,
    previousRecords: convertedPreviousPeriod,
    averageSpent: averageSpent,
  };
};

const getWeekNumber = (date: Date): number => {
  const d = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
};

export const getCashFlow = async (
  convertedRecords: Record[],
  filter: FilterType
) => {
  const sortedRecords = excludeProRecords(convertedRecords).sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const evaluation = (record: Record, filter: FilterType) => {
    if (filter === "monthly") {
      return (
        new Date(record.date).getMonth() ===
          new Date(sortedRecords[0].date).getMonth() &&
        new Date(record.date).getFullYear() ===
          new Date(sortedRecords[0].date).getFullYear()
      );
    } else if (filter === "weekly") {
      return (
        getWeekNumber(new Date(record.date)) ===
        getWeekNumber(new Date(sortedRecords[0].date))
      );
    } else if (filter === "yearly") {
      return (
        new Date(record.date).getFullYear() ===
        new Date(sortedRecords[0].date).getFullYear()
      );
    }
  };

  const dateRecords = sortedRecords.filter((record) =>
    evaluation(record, filter)
  );

  if (filter === "yearly") {
    let cumulativeIncome = 0;
    let cumulativeExpense = 0;
    const cumulativeValues = dateRecords.map((record, index) => {
      if (record.type === "income") {
        cumulativeIncome += record.amount;
      } else if (record.type === "expense") {
        cumulativeExpense += record.amount;
      }

      return {
        day: index + 1,
        income: cumulativeIncome,
        expense: cumulativeExpense,
      };
    });
    return cumulativeValues;
  }

  const dayGroups = dateRecords.reduce((acc, record) => {
    const day = new Date(record.date).getDate();

    if (!acc[day]) {
      acc[day] = { day, income: 0, expense: 0 };
    }

    if (record.type === "income") {
      acc[day].income += record.amount;
    } else if (record.type === "expense") {
      acc[day].expense += record.amount;
    }
    return acc;
  }, {} as { [key: number]: { day: number; income: number; expense: number } });

  const dayValues = Object.values(dayGroups).sort((a, b) => a.day - b.day);

  let cumulativeIncome = 0;
  let cumulativeExpense = 0;

  const cumulativeValues = dayValues.map((dayData) => {
    cumulativeIncome += dayData.income;
    cumulativeExpense += dayData.expense;

    return {
      day: dayData.day,
      income: cumulativeIncome,
      expense: cumulativeExpense,
    };
  });

  return cumulativeValues;
};

export const getTotalSpent = (records: Record[], previousRecords: Record[]) => {
  const totalSpent = excludeProRecords(records).reduce((acc, record) => {
    if (record.type === "expense") {
      return acc + record.amount;
    }
    return acc;
  }, 0);

  const previousTotalSpent = excludeProRecords(previousRecords).reduce((acc, record) => {
    if (record.type === "expense") {
      return acc + record.amount;
    }
    return acc;
  }, 0);

  const avgSpent = previousTotalSpent > 0 ? (totalSpent + previousTotalSpent) / 2 : totalSpent;

  return { totalSpent, previousTotalSpent, avgSpent };
};

export const getPreviousExpense = (records: Record[], previousRecords: Record[], filter: FilterType) => {
  const sortedPreviousRecords = excludeProRecords(previousRecords).sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const sortedCurrentRecords = excludeProRecords(records).sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const evaluation = (record: Record, filter: FilterType, referenceDate: Date) => {
    if (filter === "monthly") {
      return (
        new Date(record.date).getMonth() === referenceDate.getMonth() &&
        new Date(record.date).getFullYear() === referenceDate.getFullYear()
      );
    } else if (filter === "weekly") {
      return (
        getWeekNumber(new Date(record.date)) ===
        getWeekNumber(referenceDate)
      );
    } else if (filter === "yearly") {
      return (
        new Date(record.date).getFullYear() === referenceDate.getFullYear()
      );
    }
  };

  const getReferenceDate = (records: Record[]) => {
    if (records.length === 0) return new Date();
    return new Date(records[0].date);
  };

  const previousReferenceDate = getReferenceDate(sortedPreviousRecords);
  const currentReferenceDate = getReferenceDate(sortedCurrentRecords);

  const previousDateRecords = excludeProRecords(sortedPreviousRecords).filter((record) =>
    evaluation(record, filter, previousReferenceDate)
  );

  const currentDateRecords = excludeProRecords(sortedCurrentRecords).filter((record) =>
    evaluation(record, filter, currentReferenceDate)
  );

  if (filter === "yearly") {
    let cumulativePreviousExpense = 0;
    let cumulativeCurrentExpense = 0;
    
    const maxLength = Math.max(previousDateRecords.length, currentDateRecords.length);
    
    const cumulativeValues = Array.from({ length: maxLength }, (_, index) => {
      if (index < previousDateRecords.length && previousDateRecords[index].type === "expense") {
        cumulativePreviousExpense += previousDateRecords[index].amount;
      }
      
      if (index < currentDateRecords.length && currentDateRecords[index].type === "expense") {
        cumulativeCurrentExpense += currentDateRecords[index].amount;
      }

      return {
        day: index + 1,
        expense: cumulativeCurrentExpense,
        previousExpense: cumulativePreviousExpense,
      };
    });
    return cumulativeValues;
  }

  const previousDayGroups = excludeProRecords(previousDateRecords).reduce((acc, record) => {
    const day = new Date(record.date).getDate();

    if (!acc[day]) {
      acc[day] = { day, expense: 0 };
    }

    if (record.type === "expense") {
      acc[day].expense += record.amount;
    }
    return acc;
  }, {} as { [key: number]: { day: number; expense: number } });

  const currentDayGroups = excludeProRecords(currentDateRecords).reduce((acc, record) => {
    const day = new Date(record.date).getDate();

    if (!acc[day]) {
      acc[day] = { day, expense: 0 };
    }

    if (record.type === "expense") {
      acc[day].expense += record.amount;
    }
    return acc;
  }, {} as { [key: number]: { day: number; expense: number } });

  const allDays = new Set([
    ...Object.keys(previousDayGroups).map(Number),
    ...Object.keys(currentDayGroups).map(Number)
  ]);

  const dayValues = Array.from(allDays).sort((a, b) => a - b);

  let cumulativePreviousExpense = 0;
  let cumulativeCurrentExpense = 0;

  const cumulativeValues = dayValues.map((day) => {
    const previousExpense = previousDayGroups[day]?.expense || 0;
    const currentExpense = currentDayGroups[day]?.expense || 0;
    
    cumulativePreviousExpense += previousExpense;
    cumulativeCurrentExpense += currentExpense;

    return {
      day,
      expense: cumulativeCurrentExpense,
      previousExpense: cumulativePreviousExpense,
    };
  });

  return cumulativeValues;
};

export const getAvgSpent = (records: Record[]) => {
  const totalSpent = excludeProRecords(records).reduce((acc, record) => {
    if (record.type === "expense") {
      return acc + record.amount;
    }
    return acc;
  }, 0);

  const avgSpent = totalSpent / records.length;

  return avgSpent || 0;
};
