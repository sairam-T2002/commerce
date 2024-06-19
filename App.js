// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, StatusBar } from 'react-native';
import { store } from './store';
import { Provider } from 'react-redux';
import Main from './main';
import { colorScheme } from './data';
export default function App() {
  return (
    <Provider store={store}>
      <StatusBar backgroundColor={colorScheme.statusbar} barStyle={colorScheme.statusbarContent}></StatusBar>
      <Main></Main>
    </Provider>
  );
}