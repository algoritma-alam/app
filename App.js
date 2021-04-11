import React, { useEffect, useState } from 'react';
import {View, TouchableOpacity, Text, Keyboard} from 'react-native';
import NewHomePage from '@components/NewHomePage';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePageBlueprint from '@pages/blueprints/HomePageBlueprint';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { tailwind } from "@resources/tailwind"
import SearchPage from '@pages/SearchPage'
import MerchPage from '@pages/MerchPage'
import AboutPage from '@pages/AboutPage'
import CategoryListing from '@pages/CategoryListing'
import CategoryListingBlueprint from '@pages/blueprints/CategoryListingBlueprint'
import TabNavigation from '@components/TabNavigation'
import CategoryDetails from '@pages/CategoryDetails';
import VideoPlayer from '@pages/VideoPlayer';
import SplashScreen from 'react-native-splash-screen'

export default function App() {

    const [ isLoaded, setIsLoaded ] = useState(false)

    useEffect(() => {
        SplashScreen.hide()

        const loadedTimeout = setTimeout(() => setIsLoaded(true), 1000)
        return () => clearTimeout(loadedTimeout)
    })

    const HomePageLoader = ({ navigation }) => isLoaded ? <NewHomePage navigation={navigation} /> : <HomePageBlueprint navigation={navigation}/>

    const Tab       = createBottomTabNavigator();
    const HomeStack = createStackNavigator();
    const RootStack = createStackNavigator();

    const HomeStackScreen = () => {
        return (
            <HomeStack.Navigator
                screenOptions={{
                    headerShown: false}}
            >
                <HomeStack.Screen name="home" component={HomePageLoader}/>
                <HomeStack.Screen name="category-listing" component={CategoryListing}/>
                <HomeStack.Screen name="category-details" component={CategoryDetails}/>
                <HomeStack.Screen name="video-player" component={VideoPlayer}  options={{ tabBarVisible: false }}/>
            </HomeStack.Navigator>
        );
    }

    const MainTabStack = () => {
        return (
            <Tab.Navigator
                tabBar={props => <TabNavigation {...props} />}
                tabBarOptions={{
                    keyboardHidesTabBar: true
                }}
            >
                <Tab.Screen name="home" component={HomeStackScreen}  options={{ title: 'Beranda' }}/>
                <Tab.Screen name="search" component={SearchPage} options={{ title: 'Pencarian' }}/>
                <Tab.Screen name="merch" component={MerchPage} options={{ title: 'Merch' }}/>
                <Tab.Screen name="more" component={AboutPage}  options={{ title: 'Tentang' }}/>
            </Tab.Navigator>
        )
    }

    return (
        <NavigationContainer>

            <RootStack.Navigator
                screenOptions={{
                    headerShown: false}}
            >
                <RootStack.Screen name="MainScreen" component={MainTabStack} />
                <RootStack.Screen name="VideoPlayerModal" component={VideoPlayer} options={{gestureEnabled: false, animationEnabled: false}} />
            </RootStack.Navigator>


        </NavigationContainer>
    )
}
