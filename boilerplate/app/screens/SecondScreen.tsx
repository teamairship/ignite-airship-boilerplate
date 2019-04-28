import React, { Component } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { NavigationScreenProps } from "react-navigation";
import globalColors from "../styles/globalColors";
import globalStyles from "../styles/globalStyles";
import { GlobalContext } from "../context/GlobalContextProvider";
import { Text } from "../components";
type Props = NavigationScreenProps & {};

type State = {};

class SecondScreen extends Component<Props, State> {
  static navigationOptions = {
    headerTitle: "Second"
  };

  onNavigate = () => {
    this.props.navigation.goBack();
  };

  render() {
    return (
      <GlobalContext.Consumer>
        {({ setValue, value }) => (
          <View style={[globalStyles.background, styles.container]}>
            <Text>{value}</Text>

            <TouchableOpacity onPress={() => setValue("NEW VALUE")}>
              <Text>Update Context Value</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.onNavigate}>
              <Text>Go To Back To First Screen</Text>
            </TouchableOpacity>
          </View>
        )}
      </GlobalContext.Consumer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  }
});

export default SecondScreen;
