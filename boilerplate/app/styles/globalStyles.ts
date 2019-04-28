import { Dimensions, Platform, StyleSheet } from "react-native";
import globalColors from "./globalColors";

export const DEVICE_HEIGHT = Dimensions.get("window").height;
export const DEVICE_WIDTH = Dimensions.get("window").width;

export const IOS = Platform.OS === "ios";
export const ANDROID = Platform.OS === "android";

export default StyleSheet.create({
  background: {
    backgroundColor: globalColors.airshipOrange
  }
});
