import { Navigation } from 'react-native-navigation';

import TopProducts from './TopProducts/TopProducts';
import AllProducts from './AllProducts/AllProducts';
import Cart from './Cart/Cart';
import SideDrawer from './SideDrawer/SideDrawer';
import AnonLogin from './AnonLogin/AnonLogin';
import Product from './Product/Product';

// connect screens with redux
import {Provider} from 'react-redux';
import configureStore from '../store/configureStore';
const store = configureStore();

// register all screens of the app (including internal ones)
export function registerScreens() {
  Navigation.registerComponent('app.TopProducts', () => TopProducts, store, Provider);
  Navigation.registerComponent('app.AllProducts', () => AllProducts, store, Provider);
  Navigation.registerComponent('app.Cart', () => Cart, store, Provider);
  Navigation.registerComponent('app.SideDrawer', () => SideDrawer, store, Provider);
  Navigation.registerComponent('app.AnonLogin', () => AnonLogin, store, Provider);
  Navigation.registerComponent('app.Product', () => Product, store, Provider);
}
