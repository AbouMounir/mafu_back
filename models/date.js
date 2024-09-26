const date = new Date("2024-06-14");
const formattedDate = date.toISOString().slice(0, -1) + "+00:00";
console.log(formattedDate);