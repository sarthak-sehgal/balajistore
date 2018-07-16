import { registerScreens } from './src/screens/index';
import { Navigation } from 'react-native-navigation';

registerScreens();

Navigation.startSingleScreenApp({
  screen: {
    screen: 'app.AnonLogin', // unique ID registered with Navigation.registerScreen
    title: 'Loading', // title of the screen as appears in the nav bar (optional)
  }
});