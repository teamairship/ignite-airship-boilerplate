import React, { Component } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { NavigationScreenProps } from "react-navigation";
import { FlatList } from "react-native-gesture-handler";
import globalColors from "../styles/globalColors";
import globalStyles from "../styles/globalStyles";
import { GlobalContext } from "../context/GlobalContextProvider";
import { getPokemon } from "../services/exampleService";
import { Text } from "../components";
type Props = NavigationScreenProps & {};

type State = {
  error: string | null;
  loading: boolean;
  pokemon: Array<Pokemon>;
};

class FirstScreen extends Component<Props, State> {
  static navigationOptions = {
    headerTitle: "First"
  };

  state: State = {
    error: null,
    loading: false,
    pokemon: []
  };

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    try {
      this.setState({ loading: true });
      const response = await getPokemon();
      this.setState({ pokemon: response.results, loading: false });
    } catch (error) {
      this.setState({ error: "Error Loading Pokemon", loading: false });
    }
  };

  onNavigate = () => {
    this.props.navigation.navigate("SecondScreen");
  };

  renderPokemon = () => {
    const { error, loading, pokemon } = this.state;
    if (error) return <Text>error</Text>;
    if (loading) return <Text>Loading...</Text>;
    return (
      <FlatList
        data={pokemon}
        refreshing
        keyExtractor={(item: Pokemon) => item.name}
        renderItem={(listItem: { item: Pokemon }) => {
          const { name } = listItem.item;
          return (
            <Text key={name} style={styles.pokemonName}>
              {name}
            </Text>
          );
        }}
      />
    );
  };

  render() {
    return (
      <GlobalContext.Consumer>
        {({ value }) => (
          <View style={[globalStyles.background, styles.container]}>
            <Text>{value}</Text>
            <TouchableOpacity onPress={this.onNavigate}>
              <Text>Go To Second Screen</Text>
            </TouchableOpacity>
            {this.renderPokemon()}
          </View>
        )}
      </GlobalContext.Consumer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },
  pokemonName: {
    marginTop: 10,
    color: globalColors.black
  }
});

export default FirstScreen;
