export default function formatDate(date) {
  return new Date(date).toUTCString().slice(0, -4);
}
