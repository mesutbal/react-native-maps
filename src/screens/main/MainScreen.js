import React from 'react';
import { createStackNavigator } from 'react-navigation';
import MapsScreen from './MapsScreen';


const MainScreen = createStackNavigator(
    {
        Page1: { 
            screen: () => (
                <MapsScreen style={{ padding: 50, flex: 1, backgroundColor: 'red' }} />),
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
