import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Register from './src/screens/Register';
import Home from './src/screens/Home';
import LoggedMenu from './src/components/LoggedMenu';
/* Acordarme de importar las screens */

const Stack = createNativeStackNavigator()

export default function App() {
  return (

    /* esto es si los usuarios están logueados */
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='LoggedMenu' component={LoggedMenu} />
        <Stack.Screen name='Register' component={Register} />
        <Stack.Screen name='Home' component={Home} />
      </Stack.Navigator>
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
