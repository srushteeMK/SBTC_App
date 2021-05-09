import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import WelcomeScreen from "./screens/WelcomeScreen";
import EnterDetailsScreen from "./screens/EnterDetailsScreen";
//import DetailsScreen from "./screens/DetailsScreen";
import { AppDrawerNavigator } from "./components/AppDrawerNavigator";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

export default function App() {
  return (
  <AppContainer/>
  );
}
const switchNavigator = createSwitchNavigator({
  WelcomeScreen: { screen: WelcomeScreen },
  AppDrawerNavigator: { screen: AppDrawerNavigator },
  EnterDetailsScreen: { screen: EnterDetailsScreen },
});

const AppContainer = createAppContainer(switchNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
