
import Authentification from "./screens/Authentification";
import Chat from "./screens/Chat";

import Acceuil from "./screens/Acceuil";


import React from 'react'
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export default function App() {
  const Stack = createNativeStackNavigator();
  
  return(
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        
      <Stack.Screen name="Authentification" component={Authentification}/>
      <Stack.Screen name="Acceuil" component={Acceuil} options={{headerShown:true}}/>
      <Stack.Screen name="Chat" component={Chat} options={{headerShown:true}} />
      



      </Stack.Navigator>
    </NavigationContainer>
  )



}
