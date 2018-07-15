import { Navigation } from 'react-native-navigation';

import TopProducts from './TopProducts/TopProducts';
import AllProducts from './AllProducts/AllProducts';
import Cart from './Cart/Cart';
import SideDrawer from './SideDrawer/SideDrawer';

//connect screens with redux
// import {Provider} from 'react-redux';
// import configureStore from '../store/configureStore';
// const store = configureStore();

// register all screens of the app (including internal ones)
export function registerScreens() {
//   Navigation.registerComponent('app.AuthScreen', () => AuthScreen, store, Provider);
  Navigation.registerComponent('app.TopProducts', () => TopProducts);
  Navigation.registerComponent('app.AllProducts', () => AllProducts);
  Navigation.registerComponent('app.Cart', () => Cart);
  Navigation.registerComponent('app.SideDrawer', () => SideDrawer);
}
