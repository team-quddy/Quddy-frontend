/** 숫자 단위에 맞게 문자열로 변경하는 함수 */
export function num2str(n: number): string {
  if (n < 1000) return `${n}`;
  if (n < 10000) return `${(n / 1000).toFixed(1)} K`;
  if (n < 1000000) return `${(n / 1000).toFixed(0)} K`;
  if (n < 10000000) return `${(n / 1000000).toFixed(1)} M`;
  else return `${(n / 1000000).toFixed(0)} M`;
}
