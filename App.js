// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, StatusBar } from 'react-native';
import { store } from './store';
import { Provider } from 'react-redux';
import Main from './main';
export default function App() {
  return (
    <Provider store={store}>
      <StatusBar barStyle={'light-content'}></StatusBar>
      <Main></Main>
    </Provider>
  );
}