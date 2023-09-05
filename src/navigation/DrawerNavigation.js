import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerContent from './DrawerContent';
import ModalNavigation from "./ModalNavigation";

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator initialRouteName="main" drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name="main" component={ModalNavigation} options={{ headerShown: false }} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;