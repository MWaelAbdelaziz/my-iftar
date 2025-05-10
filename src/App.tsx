import { useEffect, useState } from 'react';
import Card from './components/Card';
import {
  AppContainer,
  Belt,
  BeltContainer,
  CardsContainer,
  DataContainer,
} from './styled';
import { getFormattedDate } from './utils/date';
import { Timings, useGetPrayerTimes } from './hooks/queries/prayerTimes';

type ApiRequest = {
  latitude: number;
  longitude: number;
  method: number;
  shafaq: string;
  tune: number[];
  calendarMethod: string;
};

const initialApiData: ApiRequest = {
  latitude: 0,
  longitude: 0,
  method: 5,
  shafaq: 'general',
  tune: [0, 0, 0, 0, 0, 0, 0, 0, 0],
  calendarMethod: 'UAQ',
};

function App() {
  const [apiState, setApiState] = useState<ApiRequest>(initialApiData);
  const [enabled, setEnabled] = useState<boolean>(false);
  // const [day, setDay] = useState<number>(new Date().getDay());

  const { data: prayerTimesToday, refetch: refetchToday } = useGetPrayerTimes(enabled, getFormattedDate(0), apiState);

  const { data: prayerTimesTomorrow, refetch: refetchTomorrow } = useGetPrayerTimes(enabled, getFormattedDate(1), apiState);

  useEffect(() => {
    const now = new Date();
    const msUntilMidnight =
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).getTime() - now.getTime();
  
    const timeout = setTimeout(() => {
      refetchToday();
      refetchTomorrow();
  
      // Set up daily interval after the first midnight update
      setInterval(() => {
        refetchToday();
        refetchTomorrow();
      }, 24 * 60 * 60 * 1000); // every 24 hours
    }, msUntilMidnight);
  
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const getLocation = async () => {
      try {
        const position = await new Promise<GeolocationPosition>((resolve, reject) =>
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

  return prayerTimesToday && prayerTimesTomorrow ? (
    <AppContainer>
      <DataContainer>
        <CardsContainer>
          <Card title='Fajr' titleValue={prayerTimesToday.Fajr} />
          <Card title='Maghrib' titleValue={prayerTimesToday.Maghrib} />
          <Card title='Isha' titleValue={prayerTimesToday.Isha} />
          <Card title="Tomorrow's Fajr" titleValue={prayerTimesTomorrow.Fajr} focus />
        </CardsContainer>
      </DataContainer>
      <BeltContainer>
        <Belt />
      </BeltContainer>
    </AppContainer>
  ) : null;
}

export default App;
