import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailsScreen from '../screens/MealDetailsScreen';
import FiltersScreen from '..screens/FiltersScreen';

import Colors from '../constants/Colors';
import FavoritesScreen from '../screens/FavoritesScreen';


const defaultStackOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor
};


const MealsNavigator = createStackNavigator({
    Categories: {
        screen: CategoriesScreen
    },
    CategoryMeals: {
        screen: CategoryMealsScreen
    },
    MealDetails: {
        screen: MealDetailsScreen
    }
}, {
    // mode: 'modal',
    defaultNavigationOptions: defaultStackOptions
});

const favoritesNavigator = createStackNavigator({
        Favorites: FavoritesScreen,
        MealDetails: MealDetailsScreen,
    },
    {
        defaultNavigationOptions: defaultStackOptions
    }
);

const tabScreenConfig = {
    Meals: {
        screen: MealsNavigator, navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <Ionicons name='ios-restaurant' size={25} color={tabInfo.tintColor} />
            },
            tabBarColor: Colors.accentColor //Works only if shifting is set to true
        }
    },
    Favorites: {
        screen: favoritesNavigator, navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <Ionicons name='ios-heart' size={25} color={tabInfo.tintColor} />
            },
            tabBarColor: Colors.primaryColor //Works only if shifting is set to true
        }
    }
}

const MealsFavTabNavigator = 
    Platform.OS === 'android' 
        ? createMaterialBottomTabNavigator(tabScreenConfig, {
                activeTintColor: 'white',
                shifting: false,
                barStyle: {
                    backgroundColor: Colors.primaryColor
                }
            }) 
        : createBottomTabNavigator(tabScreenConfig, {
                tabBarOptions: {
                    activeTintColor: Colors.primaryColor
                }
            });

    
const FiltersNavigator = createStackNavigator({
    Filters: FiltersScreen
});

const MainNavigator = createDrawerNavigator({
    MealsFavs: MealsFavTabNavigator,
    Filters: FiltersNavigator
});

export default createAppContainer(MealsFavTabNavigator);