import React, { useEffect } from 'react';
import { ScrollView, Image, View, Text, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux';

import CustomHeaderButton from '../components/HeaderButton';
import DefaultText from '../components/DefaultText';

const ListItem = props => {
    return <View style={styles.listItem}>
        <DefaultText style={{textAlign: 'left'}}>{props.children}</DefaultText>
    </View>
}

const MealDetailsScreen = props => {
    const availableMeals = useSelector(state => state.meals.meals)
    const mealId = props.navigation.getParam('mealId');

    const selectedMeal = availableMeals.find(meal => meal.id === mealId);

    // using useEffect so we don't end up in infinite loop (because props are changing)
    // -- but there's a problem - the title loads just after the component loads the first time which makes it appear a bit later
    // useEffect(() => {
    //     props.navigation.setParams({mealTitle: selectedMeal.title});
    // }, [selectedMeal]);


    return (
        <ScrollView>
            <Image source={{uri: selectedMeal.imageUrl}} style={styles.image}/>
            <View style={styles.details}>
                <DefaultText>{selectedMeal.duration}m</DefaultText>
                <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
                <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
            </View>
            <View style={styles.contentsContainer}>
                <Text style={{...styles.title, ...{marginTop: 0}}}>Ignredients</Text>
                {selectedMeal.ingredients.map(ingredient => <ListItem key={ingredient}>{ingredient}</ListItem>)}
                <Text style={styles.title}>Steps</Text>
                {selectedMeal.steps.map(step => <ListItem key={step}>{}{step}</ListItem>)}
            </View>
        </ScrollView>
    );
};

MealDetailsScreen.navigationOptions = (navigationData) => {
    const mealId = navigationData.navigation.getParam('mealId');
    const mealTitle = navigationData.navigation.getParam('mealTitle');

    return {
        headerTitle: mealTitle,
        headerRight: () => 
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item title='Favorite' iconName='ios-heart-outline' onPress={() => {console.log('marked as fav')}}/>
        </HeaderButtons>
    };
};

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 200
    },
    details: {
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'space-around'
    },
    contentsContainer: {
        paddingVertical: 20,
        paddingHorizontal: 10
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        marginBottom: 15,
        marginTop: 30
    },
    listItem: {
        textAlign: 'left'
    }
});

export default MealDetailsScreen;