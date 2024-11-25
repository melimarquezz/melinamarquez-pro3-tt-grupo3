import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Register from './src/screens/Register';
import Home from './src/screens/Home';
import LoggedMenu from './src/components/LoggedMenu';
import Login from './src/screens/Login';
import Profile from './src/screens/Profile';
import NewPost from './src/screens/NewPost';
import { auth } from './src/firebase/config';
/* Acordarme de importar las screens */

const Stack = createNativeStackNavigator()

export default function App() {


  return (

    /* esto es si los usuarios están logueados */
    <NavigationContainer style={styles.contenedor}>
      

        <Stack.Navigator style={styles.menu}>
        <Stack.Screen name='Login' component={Login} style={styles.vista} />
        <Stack.Screen name='Register' component={Register} style={styles.vista}/>
        <Stack.Screen name='LoggedMenu' component={LoggedMenu} style={styles.vista}/>
        
        </Stack.Navigator> 


      
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1, 
    backgroundColor: "#f4f4f4", 
  },
  menu: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  vista: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});
