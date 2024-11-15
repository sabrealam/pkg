import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

export  function dateFormatDDMMYYYY(date: any) {
  if (!date) return "";
  const formats = ["YYYY-MM-DD", "DD/MM/YYYY", "MM/DD/YYYY"];
  let formattedDate:any = null;
  for (let i = 0; i < formats.length; i++) {
    const parsedDate = dayjs(date, formats[i]);
    if (parsedDate.isValid()) {
      const dayOfMonth = parsedDate.date();
      const month = parsedDate.format("MMM");
      const year = parsedDate.format("YY");
      const dayOfMonthString =
        dayOfMonth +
        (dayOfMonth % 10 === 1 && dayOfMonth !== 11
          ? "st"
          : dayOfMonth % 10 === 2 && dayOfMonth !== 12
          ? "nd"
          : dayOfMonth % 10 === 3 && dayOfMonth !== 13
          ? "rd"
          : "th");
      formattedDate = `${dayOfMonthString} ${month} ${year}`;
      break;
    }
  }

  return formattedDate || "";

}

export const dateTodayApiFormat = dayjs().format("YYYY-MM-DD");
export const quickDateRangeFormat = (range:any) => {
  const today = dayjs();
  let start, end;

  switch (range) {
    case "Today":
      start = end = today;
      break;
    case "Yesterday":
      start = end = today.subtract(1, "day");
      break;
      case "This Week":
      start = today.startOf("week").add(1, "day");
      end = today.endOf("week").add(1, "day");
      break;
      case "Last Week":
      start = today.subtract(1, "week").startOf("week").add(1, "day");
      end = today.subtract(1, "week").endOf("week").add(1, "day");
      break;
    case "This Month":
      start = today.startOf("month");
      end = today.endOf("month");
      break;
    case "Last Month":
      start = today.subtract(1, "month").startOf("month");
      end = today.subtract(1, "month").endOf("month");
      break;
    case "This Year":
      start = today.startOf("year");
      end = today.endOf("year");
      break;
    case "Last Year":
      start = today.subtract(1, "year").startOf("year");
      end = today.subtract(1, "year").endOf("year");
      break;
    default:
      start = today
      end = today
      break;
  }

  return {
    startDate: start.format("YYYY-MM-DD"),
    endDate: end.format("YYYY-MM-DD"),
  };
};