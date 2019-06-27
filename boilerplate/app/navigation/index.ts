import { createAppContainer, createStackNavigator } from "react-navigation";
import FirstScreen from "../screens/FirstScreen";
import SecondScreen from "../screens/SecondScreen";

const ExampleNavigator = createStackNavigator({
  FirstScreen: { screen: FirstScreen },
  SecondScreen: { screen: SecondScreen }
});

export const MainNavigator = createStackNavigator(
  {
    exampleStack: { screen: ExampleNavigator }
  },
  {
    headerMode: "none",
    defaultNavigationOptions: { gesturesEnabled: false }
  }
);

export const RootNavigator = createAppContainer(MainNavigator);
