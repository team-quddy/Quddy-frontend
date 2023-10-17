export async function onShareURL(e: React.MouseEvent<HTMLButtonElement>, url: string) {
  e.stopPropagation();

  const URL = `${import.meta.env.VITE_APP_CLIENT_URL}/${url}`;
  await navigator.clipboard.writeText(URL);

  // TODO: 사용자에게 알림 제공
  alert("클립보드에 복사되었습니다!");
}
