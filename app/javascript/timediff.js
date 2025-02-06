export function formatTime(createdAt) {
  const now = new Date();
  const createdAtDate = new Date(createdAt);
  const timeDiff = now - createdAtDate;

  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  const nowDateOnly = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const createdDateOnly = new Date(createdAtDate.getFullYear(), createdAtDate.getMonth(), createdAtDate.getDate());
  const days = Math.floor((nowDateOnly - createdDateOnly) / (1000 * 60 * 60 * 24));

  if (days < 1) {
    if (hours < 1) {
      return seconds < 60 ? `${seconds}秒前` : `${minutes}分前`;
    } else {
      return `${hours}時間前`;
    }
  } else if (days < 3) {
    return `${days}日前`;
  } else {
    return `${createdAtDate.getFullYear()}年${createdAtDate.getMonth() + 1}月${createdAtDate.getDate()}日 ${createdAtDate.getHours()}:${String(createdAtDate.getMinutes()).padStart(2, '0')}`;
  }
}