import React from "react";
import { createDrawerNavigator } from "react-navigation-drawer";
import DetailsScreen from "../screens/DetailsScreen";
import SettingsScreen from "../screens/SettingsScreen";
import CustomSideBarMenu from "./CustomSideBarMenu"
export const AppDrawerNavigator = createDrawerNavigator({
 
    DetailsScreen: {
      screen: DetailsScreen,
    },
    Setting: {
      screen: SettingsScreen,
    },
  },
  {
    contentComponent: CustomSideBarMenu,
  },
  {
    initialRouteName: "DetailsScreen",
  }
);
