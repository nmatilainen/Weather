import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import * as Location from 'expo-location';

const Position = ({ onPositionUpdate }) => {
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          throw new Error('Permission to access location was denied');
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        onPositionUpdate(location.coords.latitude, location.coords.longitude);
      } catch (error) {
        setErrorMsg(error.message || 'Error getting location');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <View>
      {loading ? (
        <Text>Loading position...</Text>
      ) : (
        <View>
          {location ? (
            <View>
              <Text>Latitude: {location.coords.latitude}</Text>
              <Text>Longitude: {location.coords.longitude}</Text>
            </View>
          ) : (
            <Text>No location data available</Text>
          )}
        </View>
      )}
      {errorMsg && <Text>{errorMsg}</Text>}
    </View>
  );
};

export default Position;
