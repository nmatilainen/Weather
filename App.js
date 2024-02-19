import React, { useState } from 'react';
import { View } from 'react-native';
import Position from './components/Position';
import Weather from './components/Weather';

const App = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const handlePositionUpdate = (lat, lon) => {
    setLatitude(lat);
    setLongitude(lon);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Position onPositionUpdate={handlePositionUpdate} />
      {latitude !== null && longitude !== null && (
        <Weather latitude={latitude} longitude={longitude} />
      )}
    </View>
  );
};

export default App;
