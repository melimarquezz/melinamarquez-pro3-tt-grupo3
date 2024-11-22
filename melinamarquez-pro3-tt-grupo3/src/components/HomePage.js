import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import { FontAwesome } from "@expo/vector-icons"
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const Tab = createBottomTabNavigator();

function HomePage() {
    return (
        <Tab.Navigator screenOptions={{ tabBarShowLabel: false }}>
            <Tab.Screen name="Home" component={Home} options={{ tabBarIcon: () => <FontAwesome name="home" size={24} color="black" /> }} />
            <Tab.Screen name="" /*component={} options={}*/ />
            <Tab.Screen name="" /*component={} options={}*/ />
            <Tab.Screen name="" /*component={} options={}*/ />
        </Tab.Navigator>
    )
}
export default HomePage