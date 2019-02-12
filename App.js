import { Dimensions } from 'react-native';
import { createDrawerNavigator, createAppContainer } from 'react-navigation';
import MainScreen from './src/screens/main/MainScreen';


const Drawer = createDrawerNavigator({
    Home: {
      screen: MainScreen,
      navigationOptions: () => ({
        title: 'Ana Sayfa'
      })
    }
  }, 
  {
    drawerWidth: Dimensions.get('window').width 
  }
);

const App = createAppContainer(Drawer);

export default App;
