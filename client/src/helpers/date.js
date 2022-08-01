export default function formattedDate(date) {
  return new Date(date).toUTCString().slice(0, -4);
}

