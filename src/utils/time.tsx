export function renderLastUpdated(lastUpdated: number): string {
  let string = "Last updated ";
  if (lastUpdated >= 60) {
    let hours = Math.floor(lastUpdated / 60);
    if (hours > 1) {
      return string + hours + " hours ago";
    } else {
      return string + hours + " hour ago";
    }
  } else if (lastUpdated > 1) {
    return string + lastUpdated + " mins ago";
  } else if (lastUpdated === 1) {
    return string + lastUpdated + " min ago";
  } else {
    return string + "now";
  }
}

/**
 * Return a string in the format of "X hrs Y min" or "Y min" depending on the
 * the number of minutes passed.
 * @param numMinutes Number of in minutes
 * @returns string in the format of "X hrs Y min" or "Y min"
 */
export const toHoursAndMinutes = (numMinutes: number) => {
  const hours = Math.floor(numMinutes / 60);
  const minutes = numMinutes % 60;

  if (hours > 0) {
    return `${hours} hrs ${minutes} min`;
  }
  return `${minutes} min`;
};
