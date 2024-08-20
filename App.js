import { useEffect, useState } from 'react';
import { StyleSheet, StatusBar, LogBox, ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { store } from './store';
import Main from './main';
import { colorScheme } from './data';
import * as Updates from 'expo-updates';
import Login from './Components/Login';
import { fetchApiGET } from './ApiManager';
import { UserDataHelper } from './LocalStorage'; // Ensure this is imported correctly

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState('Login');

  // Ignore all logs (for development purposes)
  LogBox.ignoreAllLogs(true);

  const updateGoogleMapsApiKey = async () => {
    try {
      const data = await fetchApiGET('api/AppData/GetAppConfig', {});
      console.log(data, "Fetched config from https://10.0.5.38:7052/api/AppData/GetAppConfig");
      const apiKey = data.googleMapsApiKey;

      // Update Google Maps API key in the app
      await Updates.reloadAsync({
        android: {
          config: {
            googleMaps: {
              apiKey: apiKey,
            },
          },
        },
      });
    } catch (err) {
      console.error('Failed to update Google Maps API key:', err);
    }
    setIsLoading(false); // Set loading to false after updating
  };

  useEffect(() => {
    const checkUser = async () => {
      try {
        const userData = await UserDataHelper.getUserData("user_info_cred") || null;
        if (userData) {
          setInitialRoute('App');
          updateGoogleMapsApiKey();
        } else {
          setInitialRoute('Login');
          setIsLoading(false);
        }
      } catch (err) {
        console.error('Error checking user data:', err);
        setInitialRoute('Login'); // Show login screen if there's an error
        setIsLoading(false);
      }
    };

    checkUser();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.spinner}>
        <ActivityIndicator size="large" color="gray" />
      </View>
    );
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={initialRoute}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="App" component={Main} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  spinner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
