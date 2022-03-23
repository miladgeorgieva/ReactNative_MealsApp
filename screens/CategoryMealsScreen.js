import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

import Colors from '../constants/Colors';

import { CATEGORIES } from '../data/dummy-data';

const CategoryMealsScreen = props => {
    const catId = props.navigation.getParam('categoryId');

    const selectedCategory = CATEGORIES.find(cat => cat.id === catId);

    return (
        <View style={styles.screen}>
            <Text>Cateogory Meals Screen</Text>
            <Text>{selectedCategory.title}</Text>
            <Button title="Go to meal details" onPress={() => {
                props.navigation.navigate('MealDetails')
            }}/>
        </View>
    );
};

CategoryMealsScreen.navigationOptions = navigationData => {
    const catId = navigationData.navigation.getParam('categoryId');
    selectedCategory = CATEGORIES.find(cat => cat.id === catId);

    return {
        headerTitle: selectedCategory.title,
        headerBackTitle: "Back"
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default CategoryMealsScreen;