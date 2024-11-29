import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  Button,
} from "react-native";
import { database } from "../config"; // Import Realtime Database
import { ref, push, set, get, query, orderByChild, equalTo } from "firebase/database"; // Import des fonctions nécessaires
import * as ImagePicker from "expo-image-picker";

export default function MyProfil() {
  const [nom, setNom] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [telephone, setTelephone] = useState("");
  const [imageUri, setImageUri] = useState(null); // Stocke l'URI de l'image sélectionnée

  // Fonction pour sélectionner et afficher une image
  const pickImageAndUpload = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert("Permission d'accès à la galerie refusée !");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.5,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri); // Stocke l'URI de l'image
    } else {
      console.log("Sélection annulée.");
    }
  };

  // Fonction pour vérifier si un numéro est unique
  const isTelephoneUnique = async (telephone) => {
    try {
      const profilesRef = ref(database, "profiles");
      const telephoneQuery = query(profilesRef, orderByChild("telephone"), equalTo(telephone));
      const snapshot = await get(telephoneQuery);

      return !snapshot.exists(); // Retourne true si le numéro est unique
    } catch (error) {
      console.error("Erreur lors de la vérification du numéro :", error);
      return false; // Considérer comme non unique en cas d'erreur
    }
  };

  // Fonction pour enregistrer le profil dans Firebase
  const handleSave = async () => {
    if (!nom  || !pseudo || !telephone) {
      window.alert("Veuillez remplir tous les champs.");
      return;
    }

    const isUnique = await isTelephoneUnique(telephone);
    if (!isUnique) {
      window.alert( "Ce numéro de téléphone existe déjà.");
      return;
    }

    try {
      const profilesRef = ref(database, "profiles");
      const newProfileRef = push(profilesRef);

      set(newProfileRef, {
        nom,
        pseudo,
        telephone,
        imageUri, // Ajoute l'image au profil
      })
        .then(() => {
          window.alert( "Profil ajouté avec succès !");
          setNom("");
          setPseudo("");
          setTelephone("");
          setImageUri(null);
        })
        .catch((error) => {
          console.error("Erreur lors de l’ajout du profil :", error);
          window.alert( "Échec de l'ajout du profil.");
        });
    } catch (error) {
      console.error("Erreur inattendue :", error);
      window.alert( "Une erreur inattendue est survenue.");
    }
  };

  return (
    <ImageBackground
      source={require("../assets/imgbleu.jpg")}
      style={styles.container}
    >
      <StatusBar style="light" />
      <Text style={styles.textstyle}>My Account</Text>

      {/* Image de profil */}
      {imageUri ? (
        <Image
          source={{ uri: imageUri }}
          style={{ height: 200, width: 200, borderRadius: 100 }}
        />
      ) : (
        <Image
          source={require("../assets/profil.png")}
          style={{ height: 200, width: 200 }}
        />
      )}

      {/* Bouton pour sélectionner une image */}
      <Button title="Select Profile Pic" onPress={pickImageAndUpload} />

      {/* Champs de saisie */}
      <TextInput
        onChangeText={setNom}
        value={nom}
        textAlign="center"
        placeholderTextColor="#fff"
        placeholder="Nom"
        style={styles.textinputstyle}
      />
     
      <TextInput
        onChangeText={setPseudo}
        value={pseudo}
        textAlign="center"
        placeholderTextColor="#fff"
        placeholder="Pseudo"
        style={styles.textinputstyle}
      />
      <TextInput
        onChangeText={setTelephone}
        value={telephone}
        textAlign="center"
        placeholderTextColor="#fff"
        placeholder="Numero"
        keyboardType="phone-pad"
        style={styles.textinputstyle}
      />

      {/* Bouton pour enregistrer le profil */}
      <TouchableHighlight onPress={handleSave} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableHighlight>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  textinputstyle: {
    fontWeight: "bold",
    backgroundColor: "#0004",
    fontSize: 20,
    color: "#fff",
    width: "75%",
    height: 50,
    borderRadius: 10,
    margin: 5,
    paddingHorizontal: 10,
  },
  textstyle: {
    fontSize: 24,
    fontFamily: "serif",
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 20,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  saveButton: {
    marginBottom: 10,
    borderWidth: 2,
    backgroundColor: "#000",
    height: 60,
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginTop: 20,
  },
  saveButtonText: {
    color: "#FFF",
    fontSize: 24,
  },
});
