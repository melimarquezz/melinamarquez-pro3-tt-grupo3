import React from "react";
import {createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import {FontAwesome} from "@expo/vector-icons"
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Register from "../screens/Register";
import Login from "../screens/Login";
import Profile from "../screens/Profile";
import NewPost from "../screens/NewPost";
import SearchResults from "../screens/SearchResults";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';
/* importar las screens*/
  /*  */

const Tab = createBottomTabNavigator();

function LoggedMenu() {
    return(
        <Tab.Navigator screenOptions={{tabBarShowLabel: true}}>
            <Tab.Screen name="Login" component={Login} options={{tabBarIcon: () => <Entypo name="login" size={24} color="black" />}} />
            <Tab.Screen name="Home" component={Home} options={{ tabBarIcon: () => <FontAwesome name="home" size={24} color="black" /> }}/>
            <Tab.Screen name="Register" component={Register} options={{tabBarIcon: () => <MaterialIcons name="app-registration" size={24} color="black" />}}/>
            
            <Tab.Screen name="Profile" component={Profile} options={{tabBarIcon: () => <FontAwesome6 name="person" size={24} color="black" />}}/>
            <Tab.Screen name="NewPost" component={NewPost} options={{tabBarIcon: () => <MaterialIcons name="post-add" size={24} color="black" />}}/>
            <Tab.Screen name="SearchResults" component={SearchResults} options={{tabBarIcon: () => <FontAwesome name="search" size={24} color="black" />}}/>

        </Tab.Navigator>
    )
}

export default LoggedMenu