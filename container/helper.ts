export const convertTo12HourFormat = (dateTimeString: string) => {
  // Create a Date object from the input string
  const date = new Date(dateTimeString);

  // Get hours, minutes, and seconds
  let hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();

  // Determine AM or PM suffix
  const ampm = hours >= 12 ? 'PM' : 'AM';

  // Convert hours to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // Handle 0 as 12

  // Format minutes and seconds to always have two digits
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  // Return the formatted time string
  return `${hours}:${formattedMinutes} ${ampm}`;
};
