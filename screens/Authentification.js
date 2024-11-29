import { StatusBar } from 'expo-status-bar';
import { useRef, useState } from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import { ImageBackground, StyleSheet, Text, View, TextInput, Button } from 'react-native';

// Importation de Firebase compact
import { createUserWithEmailAndPassword ,signInWithEmailAndPassword} from 'firebase/auth';
import { auth } from '../config';  // Assurez-vous que 'auth' est déjà initialisé dans config.js

export default function Authentification(props) {

  const [email, setEmail] = useState("foulen@gmail.com");
  const [password, setPassword] = useState("123456");
  const refInput2 = useRef();

   // Fonction pour gérer la connexion
   const handleSignIn = () => {
    // Utilisation de signInWithEmailAndPassword de Firebase
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Connexion réussie, utilisateur connecté
        const user = userCredential.user;
        Alert.alert("Connexion réussie", `Bienvenue, ${user.email}`);
        // Navigation vers l'accueil
        props.navigation.navigate("Acceuil");
      })
      .catch((error) => {
        // Gestion des erreurs (par exemple, mauvais mot de passe, utilisateur non trouvé)
        const errorMessage = error.message;
        Alert.alert("Erreur de connexion", errorMessage);
      });
  };

  const handleCreateUser = () => {
    createUserWithEmailAndPassword( auth, email, password)
      .then((userCredential) => {
        // Utilisateur créé avec succès
        const user = userCredential.user;
        Alert.alert("User created successfully");
        props.navigation.navigate("Acceuil");
      })
      .catch((error) => {
        // Gestion des erreurs de création de compte
        const errorMessage = error.message;
        Alert.alert("Error creating user", errorMessage);
      });
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <View style={{ height: 24, width: '100%', backgroundColor: "#55f" }}></View>

      <ImageBackground 
        source={require("../assets/back.jpg")}
        resizeMode="cover" 
        style={styles.image}
      >
        <View style={styles.authContainer}>
          <Text style={styles.title}>Authentification</Text>

          <TextInput
            value={email}
            onChangeText={(text) => setEmail(text)}
            onSubmitEditing={() => { refInput2.current.focus(); }}
            blurOnSubmit={false}
            keyboardType='email-address'
            style={styles.input} 
            placeholder='Email'
          />

          <TextInput
            ref={refInput2}
            value={password}
            onChangeText={(text) => setPassword(text)}
            keyboardType='default' 
            style={styles.input} 
            placeholder='Password'
            secureTextEntry={true}
          />

          <Button
            title='Sign In'
            onPress={handleSignIn}
          />

          <TouchableOpacity 
            style={styles.createUser}
            onPress={handleCreateUser}
          >
            <Text style={styles.createUserText}>Create new user</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  image: {
    flex: 1,
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  authContainer: {
    backgroundColor: "#0002",
    borderRadius: 8,
    height: "50%",
    width: "85%",
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    marginTop: 15,
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  input: {
    fontFamily: "serif",
    padding: 20,
    fontSize: 16,
    marginBottom: 15,
    marginTop: 15,
    backgroundColor: "white",
    height: 60,
    width: "90%",
    borderRadius: 5,
  },
  createUser: {
    width: "100%",
    alignItems: "flex-end",
    paddingRight: 20,
  },
  createUserText: {
    fontWeight: "bold",
    marginTop: 15,
    color: "white",
  },
});
