import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import firebase from "firebase";
var url = "";
const test = firebase
  .storage()
  .ref("convention.pdf")
  .getDownloadURL()
  .then((uri) => {
    url = uri;
  })
  .catch();

const Accords = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 2 }}>
        <TouchableOpacity
          style={styles.bloc1}
          onPress={() => navigation.navigate("Accords Anjou Maine")}
        >
          <Text style={styles.texte1}>Accords Anjou Maine</Text>
          <Image
            source={require("../Images/suivant.png")}
            style={styles.image}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bloc2}
          onPress={() => {
            navigation.navigate("PdfReader", { uri: url });
          }}
        >
          <Text style={styles.texte2}>Convention collective</Text>
          <Image
            source={require("../Images/suivant.png")}
            style={styles.image}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bloc1}
          onPress={() => navigation.navigate("Réglement intérieur")}
        >
          <Text style={styles.texte1}>Réglement intérieur</Text>
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
    color: "#E7591C",
    textAlign: "center",
    marginTop: 15,
    fontSize: 30,
  },
  bloc1: {
    width: Dimensions.get("window").width,
    flex: 1,
    backgroundColor: "#89CCCF",
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
    color: "#89CCCF",
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

export default Accords;
