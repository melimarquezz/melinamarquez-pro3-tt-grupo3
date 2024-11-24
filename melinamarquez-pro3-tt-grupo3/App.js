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

  let userLogueado = auth.currentUser
  return (

    /* esto es si los usuarios están logueados */
    <NavigationContainer>
      
        {userLogueado ? 
        <Stack.Navigator>
         <Stack.Screen name='LoggedMenu' component={LoggedMenu} />
         </Stack.Navigator>
    
          : 
        <Stack.Navigator>
        <Stack.Screen name='Register' component={Register} />
        <Stack.Screen name='Login' component={Login} />
        </Stack.Navigator> }


      
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
