import React from "react";
import {createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import {FontAwesome} from "@expo/vector-icons"
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Register from "../screens/Register";
import Login from "../screens/Login";
import Profile from "../screens/Profile";
import NewPost from "../screens/NewPost";

/* importar las screens*/

const Tab = createBottomTabNavigator();

function LoggedMenu() {
    return(
        <Tab.Navigator screenOptions={{tabBarShowLabel: false}}>
            <Tab.Screen name="Home" component={Home} options={{ tabBarIcon: () => <FontAwesome name="home" size={24} color="black" /> }}/>
            <Tab.Screen name="Register" component={Register} options={{tabBarIcon: () => <FontAwesome6 name="person" size={24} color="black"/>}}/>
            <Tab.Screen name="Login" component={Login} options={{tabBarIcon: () => <FontAwesome name="home" size={24} color="black"/>}} />
            <Tab.Screen name="Profile" component={Profile} options={{tabBarIcon: () => <FontAwesome name="home" size={24} color="black"/>}}/>
            <Tab.Screen name="NewPost" component={NewPost} options={{tabBarIcon: () => <FontAwesome name="home" size={24} color="black"/>}}/>
        </Tab.Navigator>
    )
}

export default LoggedMenu