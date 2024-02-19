import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';

const Weather = ({ latitude, longitude }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
        const apiUrl = process.env.EXPO_PUBLIC_API_URL;
        const apiKey = process.env.EXPO_PUBLIC_API_KEY;
      
        console.log('Latitude:', latitude);
        console.log('Longitude:', longitude);
      
        try {
          const response = await fetch(
            `${apiUrl}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
          );
          const data = await response.json();
          if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch weather data');
          }
          setWeatherData(data);
        } catch (error) {
          console.error('Error fetching weather data:', error);
          setError(error.message || 'Error fetching weather data');
        } finally {
          setLoading(false);
        }
      };

    
      
      

    fetchData();
  }, [latitude, longitude]);

  if (loading) {
    return <Text>Loading weather data...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  const iconsUrl = process.env.EXPO_PUBLIC_API_ICONS_URL;

  return (
    <View>
      <Text>Temperature: {weatherData.main.temp}°C</Text>
      <Text>Description: {weatherData.weather[0].description}</Text>
      <Image
        source={{
          uri: `${iconsUrl}/${weatherData.weather[0].icon}.png`,
        }}
        style={{ width: 50, height: 50 }}
      />
    </View>
  );
};

export default Weather;
