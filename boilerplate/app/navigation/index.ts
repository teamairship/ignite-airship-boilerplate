import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import FirstScreen from '../screens/FirstScreen';
import SecondScreen from '../screens/SecondScreen';

const ExampleNavigator = createStackNavigator({
  FirstScreen: { screen: FirstScreen },
  SecondScreen: { screen: SecondScreen },
});

export const MainNavigator = createStackNavigator(
  {
    exampleStack: { screen: ExampleNavigator },
  },
  {
    headerMode: 'none',
    navigationOptions: { gesturesEnabled: false },
  },
);

export const RootNavigator = createAppContainer(MainNavigator);
