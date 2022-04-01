import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Platform, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailsScreen from '../screens/MealDetailsScreen';
import FiltersScreen from '../screens/FiltersScreen';

import Colors from '../constants/Colors';
import FavoritesScreen from '../screens/FavoritesScreen';


const defaultStackOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans'
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
            tabBarColor: Colors.accentColor, //Works only if shifting is set to true,
            tabBarLabel: Platform.OS === 'android' ? <Text style={{fontFamily: 'open-sans-bold'}}>Meals</Text> : 'Meals'// Workaround to change styling of the label because there's no other way as of right now
        }
    },
    Favorites: {
        screen: favoritesNavigator, navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <Ionicons name='ios-heart' size={25} color={tabInfo.tintColor} />
            },
            tabBarColor: Colors.primaryColor, //Works only if shifting is set to true
            tabBarLabel: Platform.OS === 'android' ? <Text style={{fontFamily: 'open-sans-bold'}}>Favorites</Text> : 'Favorites'
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
                    labelStyle: {
                        fontFamily: 'open-sans-bold'
                    },
                    activeTintColor: Colors.primaryColor
                }
            });

    
const FiltersNavigator = createStackNavigator({
    Filters: FiltersScreen
}, {
    defaultNavigationOptions: defaultStackOptions
});

const MainNavigator = createDrawerNavigator({
    MealsFavs: {
        screen: MealsFavTabNavigator,
        navigationOptions: {
            drawerLabel: 'Meals'
        }
    },
    Filters: FiltersNavigator
}, {
    contentOptions: {
        activeTintColor: Colors.primaryColor,
        labelStyle: {
            fontFamily: 'open-sans-bold',
            fontSize: 20
        }
    }
});

export default createAppContainer(MainNavigator);