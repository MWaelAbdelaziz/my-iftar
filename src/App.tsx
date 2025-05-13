import { useEffect, useState } from 'react';
import Card from './components/Card';
import {
  AppContainer,
  Belt,
  BeltContainer,
  CardsContainer,
  DataContainer,
} from './styled';
import {
  formatFrom24To12,
  formatFrom24ToDate,
  formatTime,
  formatToApiDate,
} from './utils/date';
import { ApiRequest, useGetPrayerTimes } from './hooks/queries/prayers';

const initialApiData: ApiRequest = {
  latitude: 0,
  longitude: 0,
  method: 5,
  shafaq: 'general',
  tune: [0, 0, 0, 0, 0, 0, 0, 0, 0],
  calendarMethod: 'UAQ',
};

type ImportantPrayers = 'Fajr' | 'Maghrib' | 'Isha' | "Tomorrow's Fajr";

function App() {
  const [apiState, setApiState] = useState<ApiRequest>(initialApiData);
  const [enabled, setEnabled] = useState<boolean>(false);

  const [nextPrayer, setNextPrayer] = useState<ImportantPrayers | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [nextPrayerTime, setNextPrayerTime] = useState<Date | null>(null);

  const { data: prayerTimesToday, refetch: refetchToday } = useGetPrayerTimes(
    enabled,
    formatToApiDate(0),
    apiState
  );

  const { data: prayerTimesTomorrow, refetch: refetchTomorrow } =
    useGetPrayerTimes(enabled, formatToApiDate(1), apiState);

  useEffect(() => {
    if (!prayerTimesToday || !prayerTimesTomorrow) return;

    const now = new Date();
    const prayers = [
      { name: 'Fajr', time: formatFrom24ToDate(prayerTimesToday.Fajr) },
      { name: 'Maghrib', time: formatFrom24ToDate(prayerTimesToday.Maghrib) },
      { name: 'Isha', time: formatFrom24ToDate(prayerTimesToday.Isha) },
      {
        name: "Tomorrow's Fajr",
        time: formatFrom24ToDate(prayerTimesTomorrow.Fajr, 1),
      },
    ];

    const upcoming = prayers.find((prayer) => prayer.time > now);
    if (upcoming) {
      setNextPrayer(upcoming.name as ImportantPrayers);
      setNextPrayerTime(upcoming.time);
    }
  }, [prayerTimesToday, prayerTimesTomorrow]);

  useEffect(() => {
    if (!nextPrayerTime) return;

    const updateRemaining = () => {
      const now = new Date();
      const remaining = nextPrayerTime.getTime() - now.getTime();
      setTimeRemaining(remaining > 0 ? remaining : 0);
    };

    updateRemaining();
    const interval = setInterval(updateRemaining, 1000);

    return () => clearInterval(interval);
  }, [nextPrayerTime]);

  useEffect(() => {
    const now = new Date();
    const msUntilMidnight =
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).getTime() -
      now.getTime();

    const timeout = setTimeout(() => {
      refetchToday();
      refetchTomorrow();

      // Set up daily interval after the first midnight update
      setInterval(
        () => {
          refetchToday();
          refetchTomorrow();
        },
        24 * 60 * 60 * 1000
      ); // every 24 hours
    }, msUntilMidnight);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const getLocation = async () => {
      try {
        const position = await new Promise<GeolocationPosition>(
          (resolve, reject) =>
            navigator.geolocation.getCurrentPosition(resolve, reject)
        );

        setApiState((prev) => ({
          ...prev,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }));

        setEnabled(true);
      } catch (err) {
        console.error('Geolocation error:', err);
      }
    };

    getLocation();
  }, []);

  return prayerTimesToday && prayerTimesTomorrow && timeRemaining ? (
    <AppContainer>
      <DataContainer>
        <h1>My Iftar</h1>
        <CardsContainer>
          <Card
            title='Fajr'
            titleValue={formatFrom24To12(prayerTimesToday.Fajr)}
            remaining={
              nextPrayer === 'Fajr' ? formatTime(timeRemaining) : undefined
            }
          />
          <Card
            title='Maghrib'
            titleValue={formatFrom24To12(prayerTimesToday.Maghrib)}
            remaining={
              nextPrayer === 'Maghrib' ? formatTime(timeRemaining) : undefined
            }
          />
          <Card
            title='Isha'
            titleValue={formatFrom24To12(prayerTimesToday.Isha)}
            remaining={
              nextPrayer === 'Isha' ? formatTime(timeRemaining) : undefined
            }
          />
          <Card
            title="Tomorrow's Fajr"
            titleValue={formatFrom24To12(prayerTimesTomorrow.Fajr)}
            remaining={
              nextPrayer === "Tomorrow's Fajr"
                ? formatTime(timeRemaining)
                : undefined
            }
          />
        </CardsContainer>
      </DataContainer>
      <BeltContainer>
        <Belt />
      </BeltContainer>
    </AppContainer>
  ) : null;
}

export default App;
