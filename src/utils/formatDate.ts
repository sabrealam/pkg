import  {dateFormatDDMMYYYY}  from "./dateFormates";

export default function formatDate(value: string) {
  if (/\d/.test(value)) {
    const parts = value.split(/\s+/);
    const name = parts.slice(0, -1).join(" ");
    const number = parts.slice(-1)[0];
    return `${name} ${dateFormatDDMMYYYY(number)}`;
  }
  return dateFormatDDMMYYYY(value);
}
