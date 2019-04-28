import React, { Component } from "react";

export const GlobalContext = React.createContext<GlobalContextType>(
  {} as GlobalContextType
);

export type GlobalContextType = {
  setValue: (value: string) => void;
  value: string;
};

export default class ModalsProvider extends Component<{}, GlobalContextType> {
  setValue = (value: string) => {
    this.setState({ value });
  };

  state: GlobalContextType = {
    setValue: this.setValue,
    value: "Initial Context Value"
  };

  render() {
    return (
      <GlobalContext.Provider value={this.state}>
        {this.props.children}
      </GlobalContext.Provider>
    );
  }
}
