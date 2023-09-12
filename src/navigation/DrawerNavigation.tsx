import React, { useRef } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerContent from './DrawerContent';
import ModalNavigation from "./ModalNavigation";

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {

  const drawerRef = useRef(null);

  const openDrawer = () => {
    if (drawerRef.current) {
      drawerRef.current.openDrawer();
    }
  };
  
  return (
    <Drawer.Navigator
      initialRouteName="main"
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen
        name="main"
        component={ModalNavigation}
        options={{
          headerShown: false,
        }}
        listeners={({ navigation }) => ({
          drawerItemPress: () => {
            openDrawer();
          },
        })}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
