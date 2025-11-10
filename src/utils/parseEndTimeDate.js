export default function parseTimeToDate(timeStr, dateStr) {
  const [time, period] = timeStr.split(" ");
  let [hour, minute] = time.split(":").map(Number);
  if (period === "PM" && hour !== 12) hour += 12;
  if (period === "AM" && hour === 12) hour = 0;
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day, hour, minute);
}