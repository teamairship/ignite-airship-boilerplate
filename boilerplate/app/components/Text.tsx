import React from "react";
import { Text as ReactNativeText, TextStyle, StyleSheet } from "react-native";
import globalColors from "../styles/globalColors";

type Props = {
  style?: TextStyle;
};

const Text: React.FC<Props> = props => {
  return (
    <ReactNativeText style={[styles.text, props.style]}>
      {props.children}
    </ReactNativeText>
  );
};

const styles = StyleSheet.create({
  text: {
    color: globalColors.white
  }
});

export default Text;
