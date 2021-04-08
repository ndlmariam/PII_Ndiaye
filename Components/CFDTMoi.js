import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";

const CFDTMoi = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 2 }}>
        <TouchableOpacity
          style={styles.bloc1}
          onPress={() => navigation.navigate("Définition")}
        >
          <Text style={styles.texte1}>Qu'est ce que la CFDT ?</Text>
          <Image
            source={require("../Images/suivant.png")}
            style={styles.image}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bloc2}
          onPress={() => navigation.navigate("Pourquoi")}
        >
          <Text style={styles.texte2}>Pourquoi adhérer ?</Text>
          <Image
            source={require("../Images/suivant.png")}
            style={styles.image}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bloc1}
          onPress={() => navigation.navigate("Mes droits")}
        >
          <Text style={styles.texte1}>Mes droits</Text>
          <Image
            source={require("../Images/suivant.png")}
            style={styles.image}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bloc2}
          onPress={() => navigation.navigate("Adhésion")}
        >
          <Text style={styles.texte2}>J'adhère</Text>
          <Image
            source={require("../Images/suivant.png")}
            style={styles.image}
          />
        </TouchableOpacity>
      </View>
      <View style={{ flex: 2 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  titre: {
    color: "#F2AAC8",
    textAlign: "center",
    marginTop: 15,
    fontSize: 30,
  },
  bloc1: {
    width: Dimensions.get("window").width,
    flex: 1,
    backgroundColor: "#F2AAC8",
    flexDirection: "row",
    alignItems: "center",
  },
  bloc2: {
    width: Dimensions.get("window").width,
    flex: 1,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
  },
  texte1: {
    color: "white",
    fontSize: 25,
    marginLeft: 10,
    flex: 10,
  },
  texte2: {
    color: "#F2AAC8",
    fontSize: 25,
    marginLeft: 10,
    flex: 10,
  },
  image: {
    width: 20,
    height: 20,
    flex: 1,
  },
});

export default CFDTMoi;
