import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ImageBackground,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  Linking,
  Alert,
} from "react-native";
import { ref, onValue } from "firebase/database";
import { auth, database } from "../config"; // Import Firebase configuration
import Icon from "react-native-vector-icons/MaterialIcons"; // Icônes pour le chat

export default function MyProfilList(props) {
  const [allProfils, setAllProfils] = useState([]); // Stocke les profils récupérés
  const [loading, setLoading] = useState(true); // Indique si les données sont en cours de chargement

  useEffect(() => {
    const profilesRef = ref(database, "profiles"); // Référence vers "profiles"
    const unsubscribe = onValue(
      profilesRef,
      (snapshot) => {
        const data = snapshot.val(); // Récupérer toutes les données
        if (data) {
          const formattedData = Object.keys(data).map((key) => ({
            id: key, // Clé unique
            ...data[key], // Données du profil
          }));
          setAllProfils(formattedData); // Mettre à jour l'état
        } else {
          setAllProfils([]); // Aucun profil trouvé
        }
        setLoading(false); // Fin du chargement
      },
      (error) => {
        console.error("Erreur lors de la récupération des profils :", error);
        setLoading(false); // Arrêter le chargement même en cas d'erreur
      }
    );

    return () => unsubscribe(); // Nettoyer l'abonnement lors du démontage
  }, []);

  const navigateToChat = (profile) => {
    props.navigation.navigate("Chat", {
      id: profile.id,
      nom: profile.nom,
      prenom: profile.prenom,
      imageUri: profile.imageUri, // ou tout autre paramètre que vous voulez transmettre
    });
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      {/* Affichage de l'image du profil */}
      <Image
        source={item.imageUri ? { uri: item.imageUri } : require("../assets/profil.png")}
        style={styles.profileImage}
      />

      {/* Informations sur le profil */}
      <View style={{ flex: 1, marginLeft: 10 }}>
        <Text style={styles.title}>Nom : {item.nom}</Text>
        <Text style={styles.subtitle}>Pseudo : {item.pseudo}</Text>
        <Text style={styles.subtitle}>Téléphone : {item.telephone}</Text>
      </View>

      {/* Bouton pour discuter */}
      <TouchableOpacity onPress={() => navigateToChat(item)} style={styles.iconContainer}>
        <Icon name="message" size={30} color="#fff" />
      </TouchableOpacity>

   

 {/* Icône téléphone */}
 <TouchableOpacity  onPress={() => {
          const phoneNumber = `tel:${item.telephone}`;
          if (!item.telephone || isNaN(item.telephone)) {
            Alert.alert("Erreur", "Numéro invalide");
          } else {
            Linking.openURL(phoneNumber).catch((err) =>
              console.error("Erreur lors de l'appel :", err)
            );
          }
        }} style={styles.phoneIconContainer}>
        <Icon name="phone" size={30} color="white" />
      </TouchableOpacity>


    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={{ backgroundColor: "#575", width: "100%", height: 24 }} />

      <ImageBackground
        source={require("../assets/imgbleu.jpg")}
        resizeMode="cover"
        style={styles.image}
      >
        <Text style={styles.acceuil}>Liste des Profils</Text>

        {loading ? (
          <Text style={styles.loadingText}>Chargement des profils...</Text>
        ) : (
          <FlatList
            data={allProfils}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            style={{ width: "100%", flex: 1 }}
          />
        )}

        {/* Bouton de déconnexion */}
        <View style={styles.layout}>
          <TouchableHighlight
            style={styles.touch}
            activeOpacity={0.5}
            underlayColor="navy"
            onPress={() => {
              auth.signOut().then(() => {
                props.navigation.replace("Authentification");
              });
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>Log Out</Text>
          </TouchableHighlight>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  acceuil: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#456",
    marginVertical: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 14,
    color: "white",
  },
  item: {
    backgroundColor: "#456",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  iconContainer: {
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  layout: {
    height: 100,
    padding: 20,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  touch: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#588",
    width: "80%",
  },
  loadingText: {
    fontSize: 18,
    color: "#555",
    marginTop: 20,
  },
  callButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#34A853", // Vert
    borderRadius: 5,
    alignItems: "center",
  },
  phoneIconContainer: {
    marginLeft: 10,
    padding: 5,
    backgroundColor: "#34A853", // Couleur verte pour l'appel
    borderRadius: 20,
  },
});
