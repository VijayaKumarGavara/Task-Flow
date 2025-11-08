// utils/getTaskStatus.js
export default function getTaskStatus(endTimeString, now = new Date()) {
  if (!endTimeString) return "invalid";

  const [time, modifier] = endTimeString.split(" ");
  let [hours, minutes] = time.split(":").map(Number);

  if (modifier === "PM" && hours !== 12) hours += 12;
  if (modifier === "AM" && hours === 12) hours = 0;

  const end = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    hours,
    minutes,
    0,
    0
  );

  const diffMs = end.getTime() - now.getTime();
  const diffMinutes = diffMs / 60000;

  if (diffMinutes > 5) return "upcoming"; // more than 5 mins left
  if (diffMinutes >= -5 && diffMinutes <= 5) return "active"; // within markable window
  if (diffMinutes < -5) return "missed"; // past window
  return "invalid";
}
