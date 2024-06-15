export function formatDate(rowDate) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const date = new Date(rowDate);

    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    const dayNumber = day < 10 ? `0${day}` : day;

    return `${dayNumber} ${months[month]} ${year}`;
}