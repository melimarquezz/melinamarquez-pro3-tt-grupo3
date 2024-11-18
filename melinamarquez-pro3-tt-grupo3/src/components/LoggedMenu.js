import React from "react";
import {createBottomTabNavigator } from "@react-navigation/bottom-tabs";

/* importar las screens*/

const Tab = createBottomTabNavigator();

function LoggedMenu() {
    return(
        <Tab.Navigator screenOptions={{tabBarShowLabel: false}}>
            <Tab.Screen name="" /*component={} options={}*//>
            <Tab.Screen name="" /*component={} options={}*//>
            <Tab.Screen name="" /*component={} options={}*//>
            <Tab.Screen name="" /*component={} options={}*//>
        </Tab.Navigator>
    )
}

export default LoggedMenu