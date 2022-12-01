export function leadingZero(num = 0): string {
  return num < 10 ? ('0' + num) : ('' + num);
}