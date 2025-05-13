import { useEffect, useState } from 'react';
import { formatFrom24ToDate, formatToApiDate } from '../../utils/date';
import { ApiRequest, useGetPrayerTimes } from '../queries/usePrayer';

type ImportantPrayers = 'Fajr' | 'Maghrib' | 'Isha' | "Tomorrow's Fajr";

export function useNextPrayer(apiState: ApiRequest, enabled: boolean) {
  const [nextPrayer, setNextPrayer] = useState<ImportantPrayers | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [nextPrayerTime, setNextPrayerTime] = useState<Date | null>(null);

  const { data: today, refetch: refetchToday } = useGetPrayerTimes(
    enabled,
    formatToApiDate(0),
    apiState
  );

  const { data: tomorrow, refetch: refetchTomorrow } = useGetPrayerTimes(
    enabled,
    formatToApiDate(1),
    apiState
  );

  useEffect(() => {
    if (!today || !tomorrow) return;
    const now = new Date();
    const prayers = [
      { name: 'Fajr', time: formatFrom24ToDate(today.Fajr) },
      { name: 'Maghrib', time: formatFrom24ToDate(today.Maghrib) },
      { name: 'Isha', time: formatFrom24ToDate(today.Isha) },
      { name: "Tomorrow's Fajr", time: formatFrom24ToDate(tomorrow.Fajr, 1) },
    ];

    const upcoming = prayers.find((p) => p.time > now);
    if (upcoming) {
      setNextPrayer(upcoming.name as ImportantPrayers);
      setNextPrayerTime(upcoming.time);
    }
  }, [today, tomorrow]);

  useEffect(() => {
    if (!nextPrayerTime) return;
    const interval = setInterval(() => {
      const now = new Date();
      const remaining = nextPrayerTime.getTime() - now.getTime();
      setTimeRemaining(remaining > 0 ? remaining : 0);
    }, 1000);
    return () => clearInterval(interval);
  }, [nextPrayerTime]);

  useEffect(() => {
    const now = new Date();
    const msUntilMidnight =
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).getTime() - now.getTime();

    const timeout = setTimeout(() => {
      refetchToday();
      refetchTomorrow();
      setInterval(() => {
        refetchToday();
        refetchTomorrow();
      }, 24 * 60 * 60 * 1000);
    }, msUntilMidnight);

    return () => clearTimeout(timeout);
  }, []);

  return {
    today,
    tomorrow,
    nextPrayer,
    timeRemaining,
  };
}