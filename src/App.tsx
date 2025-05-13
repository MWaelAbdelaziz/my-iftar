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
  formatTime,
} from './utils/date';
import { ApiRequest, Timings } from './hooks/queries/usePrayer';
import { useNextPrayer } from './hooks/custom/useNextPrayer';

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
  const [enabled, setEnabled] = useState(false);

  const { today, tomorrow, nextPrayer, timeRemaining } = useNextPrayer(apiState, enabled);

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

  return today && tomorrow && timeRemaining !== null ? (
    <AppContainer>
      <DataContainer>
        <h1>My Iftar</h1>
        <CardsContainer>
          {['Fajr', 'Maghrib', 'Isha'].map((prayer) => (
            <Card
              key={prayer}
              title={prayer}
              titleValue={formatFrom24To12(today[prayer as keyof Timings])}
              remaining={nextPrayer === prayer ? formatTime(timeRemaining) : undefined}
            />
          ))}
          <Card
            title="Tomorrow's Fajr"
            titleValue={formatFrom24To12(tomorrow.Fajr)}
            remaining={nextPrayer === "Tomorrow's Fajr" ? formatTime(timeRemaining) : undefined}
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
