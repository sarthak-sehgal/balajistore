import { Navigation } from 'react-native-navigation';
import { registerScreens } from './src/screens/index';
import Icon from 'react-native-vector-icons/Ionicons';
import {Platform} from 'react-native';

registerScreens();

let icon_platform = '';
let size = 30;
if(Platform.OS === 'ios') {
  icon_platform = 'ios';
} else {
  icon_platform = 'md';
  size = 40;
}

Promise.all([
  Icon.getImageSource(icon_platform+"-star", size),
  Icon.getImageSource(icon_platform+"-albums", size),
  Icon.getImageSource(icon_platform+"-cart", size),
  Icon.getImageSource(icon_platform+"-menu", size)
]).then(sources => {
  Navigation.startTabBasedApp({
    tabs: [
      {
        label: 'Top Products', // tab label as appears under the icon in iOS (optional)
        screen: 'app.TopProducts', // unique ID registered with Navigation.registerScreen
        title: 'Explore Top Products', // title of the screen as appears in the nav bar (optional)
        icon: sources[0],
        navigatorButtons: {
          leftButtons: [
            {
              icon: sources[3],
              title: "Menu",
              id: "sideDrawerToggle"
            }
          ]
        }
      },
      {
        label: 'All Products',
        screen: 'app.AllProducts',
        title: 'Explore All Products',
        icon: sources[1],
        navigatorButtons: {
          leftButtons: [
            {
              icon: sources[3],
              title: "Menu",
              id: "sideDrawerToggle"
            }
          ]
        }
      },
      {
        label: 'Cart',
        screen: 'app.Cart',
        title: 'Shopping Cart',
        icon: sources[2],
        navigatorButtons: {
          leftButtons: [
            {
              icon: sources[3],
              title: "Menu",
              id: "sideDrawerToggle"
            }
          ]
        }
      }
    ],
    tabsStyle: {
      initialTabIndex: 1
    },
    appStyle: {
      initialTabIndex: 1
    },
    drawer: {
      left: {
        screen: 'app.SideDrawer',
        passProps: { ...this.props },
        fixedWidth: 1100,
      }
    }
  });
})