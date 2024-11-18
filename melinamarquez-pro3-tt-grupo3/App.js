import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

/* Acordarme de importar las screens */

const Stack = createNativeStackNavigator()

export default function App() {
  return (

    /* esto es si los usuarios están logueados */
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='' /*component={}*//>
        <Stack.Screen name='' /*component={}*//>
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
