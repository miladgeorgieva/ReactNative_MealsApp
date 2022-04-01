import React from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity, 
    ImageBackground,
    SafeAreaView,
    Platform,
    TouchableNativeFeedback 
} from 'react-native';
import DefaultText from './DefaultText';

const MealItem = props => {
    let TouchableComponent = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableComponent = TouchableNativeFeedback;
    }

    return (
        <SafeAreaView style={styles.mealItem}>
            <TouchableComponent onPress={props.onSelectMeal}>
                <View>
                    <View style={{...styles.mealRow, ...styles.mealHeader}}>
                        <ImageBackground source={{uri: props.image}} style={styles.bgImage}>
                            <View style={styles.titleContainer}>
                                <Text style={styles.title} numberOfLines={2}>{props.title}</Text>
                            </View>
                        </ImageBackground>
                    </View>
                    <View style={{...styles.mealRow, ...styles.mealDetail}}>
                        <DefaultText style={styles.detailText}>{props.duration}m</DefaultText>
                        <DefaultText style={styles.detailText}>{props.complexity.toUpperCase()}</DefaultText>
                        <DefaultText style={styles.detailText}>{props.affordability.toUpperCase()}</DefaultText>
                    </View>
                </View>
            </TouchableComponent>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    mealItem: { 
        height: 220,
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 10,
        marginVertical: 20,
        shadowColor: '#000',
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3
    },
    mealRow: {
        flexDirection: 'row',
    },
    mealHeader: {
        height: '80%',
        overflow: 'hidden',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    mealDetail: {
        fontFamily: 'open-sans',
        height: '20%',
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    bgImage: {
        width: '100%',
        height: '100%'
    },
    titleContainer: {
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center'
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        color: "#FFF",
        padding: 20,
        textAlign: 'center',
    }
});

export default MealItem;