import { useState } from 'react';
import Card from './components/Card/indes';
import {
  AppContainer,
  Belt,
  BeltContainer,
  CardsContainer,
  DataContainer,
} from './App';

function App() {
  const [count, setCount] = useState(0);

  return (
    <AppContainer>
      <DataContainer>
        {/* <CardsContainer>
          <Card title='Maghrib At' focus />
          <Card title='3esha At' />
          <Card title='Fajr At' />
        </CardsContainer> */}
      </DataContainer>
      <BeltContainer>
        <Belt />
      </BeltContainer>
    </AppContainer>
  );
}

export default App;
