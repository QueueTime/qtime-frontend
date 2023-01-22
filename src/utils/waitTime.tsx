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
