// Formats date base on offset from today in DD-MM-YYYY for API request
export const formatToApiDate = (offset: number = 0): string => {
  const date = new Date();
  date.setDate(date.getDate() + offset);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};

// Formats date from 24 hour system to Date
export const formatFrom24ToDate = (time: string, dayOffset = 0): Date => {
  const [hours, minutes] = time.split(':').map(Number);
  const now = new Date();
  return new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + dayOffset, // 0 for today, 1 for tomorrow
    hours,
    minutes
  );
};

// Formats date from 24 hour system to 12 hour system
export const formatFrom24To12 = (time: string): string => {
  const [hourStr, minute] = time.split(':');
  let hour = parseInt(hourStr, 10);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  hour = hour % 12 || 12;
  return `${hour.toString().padStart(2, '0')}:${minute} ${ampm}`;
};

// Formats time from milliseoncds to hh:mm:ss
export const formatTime = (ms: number): string => {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
};