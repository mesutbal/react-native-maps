import React from 'react';
import { View } from 'react-native';
import { createStackNavigator } from 'react-navigation';


const MainScreen = createStackNavigator(
    {
        Page1: { 
            screen: () => (
                <View style={{ padding: 50, flex: 1, backgroundColor: 'red' }} />),
            navigationOptions: () => ({
                title: 'Ana Sayfa'
            })
        }
    }, 
    {
        initialRouteName: 'Page1',
        headerBackTitleVisible: true,
        headerLayoutPreset: 'center'
    });

export default MainScreen;
