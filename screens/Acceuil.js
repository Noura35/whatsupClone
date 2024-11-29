import { Text, StyleSheet, View } from 'react-native'
import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MyProfilList from './MyProfilList';
import MyProfil from './MyProfil';

export default function Acceuil() {

  const Tab = createMaterialBottomTabNavigator();
 
 
    return (
      <Tab.Navigator>      
      <Tab.Screen name="Profil list" component={MyProfilList} />
      <Tab.Screen name="My profil" component={MyProfil} />

    </Tab.Navigator>
    );
  
}

const styles = StyleSheet.create({})