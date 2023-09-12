import React, { useContext } from 'react';
import { I18nManager } from 'react-native';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import { IconButton } from 'react-native-paper';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Settings from '../screens/Settings';
import About from '../screens/About';
import Terms from '../screens/Terms';
import Workouts from '../screens/Workouts';
import Goals from '../screens/Goals';
import Languages from '../languages';
import LanguageContext from '../languages/LanguageContext';
import Levels from '../screens/Levels';
import SingleGoal from '../screens/SingleGoal';
import SingleLevel from '../screens/SingleLevel';
import SearchWorkout from '../screens/SearchWorkout';
import Exercises from '../screens/Exercises';
import usePreferences from '../hooks/usePreferences';
import Equipments from '../screens/Equipments';
import SingleEquipment from '../screens/SingleEquipment';
import SingleMuscle from '../screens/SingleMuscle';
import Diets from '../screens/Diets';
import Categories from '../screens/Categories';
import Store from '../screens/Store';
import Products from '../screens/Products';
import Blog from '../screens/Blog';
import Posts from '../screens/Posts';
import SingleType from '../screens/SingleType';
import SingleTag from '../screens/SingleTag';
import Favorites from '../screens/Favorites';
import CustomWorkouts from '../screens/CustomWorkouts';
import CustomDiets from '../screens/CustomDiets';
import ColorsApp from '../config/ColorsApp';
import SingleCategory from '../screens/SingleCategory';

const Stack = createStackNavigator();

export default function StackNavigation(props: any) {
  const contextState = useContext(LanguageContext);
  const language = contextState.language;
  const Strings = Languages[language].texts;
  const { theme } = usePreferences();

  const navigatorOptions: StackNavigationOptions = {
    headerStyle: {
      shadowColor: 'transparent',
      elevation: 0,
      shadowOpacity: 0,
      backgroundColor: ColorsApp.PRIMARY,
    },
    headerTitleAlign: 'center',
    headerTintColor: '#fff',
  };

  // ******************************** Buttons

  const buttonBack = () => {
    return (
      <IconButton
        icon={I18nManager.isRTL ? 'arrow-right' : 'arrow-left'}
        iconColor="white"
        style={{ marginLeft: 15 }}
        size={24}
        onPress={() => props.navigation.goBack()}
      />
    );
  };

  const buttonMenu = () => {
    return (
      <IconButton
        icon="menu"
        size={24}
        style={{ marginLeft: 15 }}
        iconColor="white"
        onPress={() => props.navigation.openDrawer()}
      />
    );
  };

  return (
    <Stack.Navigator screenOptions={navigatorOptions}>
      <Stack.Screen
        name="home"
        component={Home}
        options={{ title: Strings.ST1, headerLeft: () => buttonMenu() }}
      />
      <Stack.Screen
        name="profile"
        component={Profile}
        options={{ title: Strings.ST6, headerLeft: () => buttonBack() }}
      />
      <Stack.Screen
        name="settings"
        component={Settings}
        options={{ title: Strings.ST108, headerLeft: () => buttonBack() }}
      />
      <Stack.Screen
        name="about"
        component={About}
        options={{ title: Strings.ST110, headerLeft: () => buttonBack() }}
      />
      <Stack.Screen
        name="terms"
        component={Terms}
        options={{ title: Strings.ST8, headerLeft: () => buttonBack() }}
      />
      <Stack.Screen
        name="workouts"
        component={Workouts}
        options={{ title: Strings.ST5, headerLeft: () => buttonBack() }}
      />
      <Stack.Screen
        name="exercises"
        component={Exercises}
        options={{ title: Strings.ST21, headerLeft: () => buttonBack() }}
      />
      <Stack.Screen
        name="equipments"
        component={Equipments}
        options={{ title: Strings.ST56, headerLeft: () => buttonBack() }}
      />
      <Stack.Screen
        name="diets"
        component={Diets}
        options={{ title: Strings.ST27, headerLeft: () => buttonBack() }}
      />
      <Stack.Screen
        name="goals"
        component={Goals}
        options={{ title: Strings.ST52, headerLeft: () => buttonBack() }}
      />
      <Stack.Screen
        name="levels"
        component={Levels}
        options={{ title: Strings.ST53, headerLeft: () => buttonBack() }}
      />
      <Stack.Screen
        name="categories"
        component={Categories}
        options={{ title: Strings.ST28, headerLeft: () => buttonBack() }}
      />
      <Stack.Screen
        name="store"
        component={Store}
        options={{ title: Strings.ST45, headerLeft: () => buttonBack() }}
      />
      <Stack.Screen
        name="products"
        component={Products}
        options={{ title: Strings.ST45, headerLeft: () => buttonBack() }}
      />
      <Stack.Screen
        name="blog"
        component={Blog}
        options={{ title: Strings.ST29, headerLeft: () => buttonBack() }}
      />
      <Stack.Screen
        name="posts"
        component={Posts}
        options={{ title: Strings.ST29, headerLeft: () => buttonBack() }}
      />
      <Stack.Screen
        name="singlegoal"
        component={SingleGoal}
        options={{ title: null, headerLeft: () => buttonBack() }}
      />
      <Stack.Screen
        name="singlelevel"
        component={SingleLevel}
        options={{ title: null, headerLeft: () => buttonBack() }}
      />
      <Stack.Screen
        name="singleequipment"
        component={SingleEquipment}
        options={{ title: null, headerLeft: () => buttonBack() }}
      />
      <Stack.Screen
        name="singlemuscle"
        component={SingleMuscle}
        options={{ title: null, headerLeft: () => buttonBack() }}
      />
      <Stack.Screen
        name="singlecategory"
        component={SingleCategory}
        options={{ title: null, headerLeft: () => buttonBack() }}
      />
      <Stack.Screen
        name="singletype"
        component={SingleType}
        options={{ title: null, headerLeft: () => buttonBack() }}
      />
      <Stack.Screen
        name="singletag"
        component={SingleTag}
        options={{ title: null, headerLeft: () => buttonBack() }}
      />
      <Stack.Screen
        name="searchworkout"
        component={SearchWorkout}
        options={{ title: Strings.ST3, headerLeft: () => buttonBack() }}
      />
      <Stack.Screen
        name="favorites"
        component={Favorites}
        options={{ title: Strings.ST4, headerLeft: () => buttonBack() }}
      />
      <Stack.Screen
        name="customworkouts"
        component={CustomWorkouts}
        options={{ title: Strings.ST50, headerLeft: () => buttonBack() }}
      />
      <Stack.Screen
        name="customdiets"
        component={CustomDiets}
        options={{ title: Strings.ST51, headerLeft: () => buttonBack() }}
      />
    </Stack.Navigator>
  );
}