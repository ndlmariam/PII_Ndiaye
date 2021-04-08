import React from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import firebase from "firebase";
import firebaseConfig from "../firebase";
class Accueil extends React.Component {
  render() {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
      console.log(firebaseConfig);
    }
    const { navigation } = this.props;

    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <TouchableOpacity
          style={{ paddingBottom: 10, flex: 1 }}
          onPress={() => navigation.navigate("Actualités")}
        >
          <Image
            source={require("../Images/actualites.png")}
            style={{ width: Dimensions.get("window").width, flex: 1 }}
          />
        </TouchableOpacity>

        <View style={{ flex: 2 }}>
          <View
            style={{
              flexDirection: "row",
              height: Dimensions.get("window").width / 2 - 2,
            }}
          >
            <TouchableOpacity
              style={styles.button1}
              onPress={() => navigation.navigate("Adhésion")}
            >
              <Image
                source={require("../Images/adhesion.png")}
                style={styles.button1}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button2}
              onPress={() => navigation.navigate("Mes droits")}
            >
              <Image
                source={require("../Images/droits.png")}
                style={styles.button2}
              />
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row", flex: 1, marginTop: 0 }}>
            <TouchableOpacity
              style={styles.button3}
              onPress={() => navigation.navigate("Accords")}
            >
              <Image
                source={require("../Images/accords.png")}
                style={styles.button3}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button4}
              onPress={() => navigation.navigate("Élus")}
            >
              <Image
                source={require("../Images/elus.png")}
                style={styles.button4}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  maincontainer: {
    // marginTop: 20
  },
  texte: {
    color: "white",
    fontSize: 40,
    textAlign: "center",
    //fontFamily: "CFDT",
  },
  button1: {
    height: Dimensions.get("window").width / 2 - 5,
    width: Dimensions.get("window").width / 2 - 5,
    flex: 1,
    marginLeft: 2,
  },
  button2: {
    height: Dimensions.get("window").width / 2 - 5,
    width: Dimensions.get("window").width / 2 - 5,
    flex: 1,
  },
  button3: {
    height: Dimensions.get("window").width / 2 - 5,
    width: Dimensions.get("window").width / 2 - 5,
    flex: 1,
    marginLeft: 2,
  },
  button4: {
    height: Dimensions.get("window").width / 2 - 5,
    width: Dimensions.get("window").width / 2 - 5,
    flex: 1,
  },
  icon: {
    flex: 2,
  },
  iconMenu: {
    marginTop: 50,
    marginLeft: 10,
    width: 30,
    height: 30,
  },
});

export default Accueil;
