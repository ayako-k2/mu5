export function formatTime(createdAt) {
  const now = new Date();
  const createdAtDate = new Date(createdAt); 
  const timeDiff = now - new Date(createdAt);

  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days < 2) {
    if (hours < 1) {
      if (minutes < 1) {
        return `${seconds}秒前`;
      } else {
        return `${minutes}分前`;
      }
    } else {
      return `${hours}時間前`;
    }
  } else {
    return `${createdAtDate.getFullYear()}年${createdAtDate.getMonth() + 1}月${createdAtDate.getDate()}日 ${createdAtDate.getHours()}時${createdAtDate.getMinutes()}分`;
  }
}