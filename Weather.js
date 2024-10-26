// Weather.js
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ScrollView, Image } from 'react-native';
import axios from 'axios';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWeatherData = async () => {
    const options = {
      method: 'GET',
      url: 'https://api.checkwx.com/metar/LZKZ/decoded',
      headers: { 'X-API-Key': '7a175505e19f45198bc59b49a3' }
    };

    try {
      const response = await axios.request(options);
      setWeatherData(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  const {
    icao, clouds, dewpoint, elevation, flight_category,
    humidity, temperature, visibility, wind, station
  } = weatherData.data[0];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Aviation Weather</Text>
      <Text style={styles.location}>{station.name}, {station.location}</Text>
      <Text style={styles.icao}>ICAO: {icao}</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Temperature</Text>
        <Text style={styles.info}>🌡 {temperature.celsius}°C / {temperature.fahrenheit}°F</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Wind</Text>
        <Text style={styles.info}>💨 {wind.speed_mph} mph ({wind.degrees}°)</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Cloud Cover</Text>
        <Text style={styles.info}>☁️ {clouds[0].text}</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Visibility</Text>
        <Text style={styles.info}>👀 {visibility.miles} miles</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Humidity</Text>
        <Text style={styles.info}>💧 {humidity.percent}%</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Elevation</Text>
        <Text style={styles.info}>🗻 {elevation.feet} ft / {elevation.meters} m</Text>
      </View>

      <Text style={styles.observationTime}>Observed at {weatherData.data[0].observed}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  loadingText: {
    marginTop: 10,
    color: '#fff',
    fontSize: 18,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    padding: 20,
  },
  errorText: {
    color: '#ff4d4d',
    fontSize: 18,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 32
  },
  location: {
    fontSize: 18,
    color: '#bbb',
    textAlign: 'center',
    marginBottom: 5,
  },
  icao: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginBottom: 20,
  },
  section: {
    marginVertical: 10,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#333',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  info: {
    fontSize: 18,
    color: '#ccc',
  },
  observationTime: {
    textAlign: 'center',
    color: '#666',
    marginTop: 20,
    fontSize: 14,
  },
});

export default Weather;
