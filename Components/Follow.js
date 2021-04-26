import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";

//Affichage des différents liens de redirection des réseaux sociaux de la CFDT nationale
class Follow extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <Text style={styles.texte}>
          Suivez le parcours national de la CFDT sur les réseaux suivants :
        </Text>
        <View style={{ marginTop: 25 }}>
          <TouchableOpacity
            style={styles.touchable}
            onPress={() => {
              Linking.openURL("https://fr-fr.facebook.com/la.CFDT/");
            }}
          >
            <Image style={styles.image} source={require("../Images/fb.png")} />
            <Text style={styles.texte}>Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.touchable}
            onPress={() => {
              Linking.openURL("https://twitter.com/cfdt");
            }}
          >
            <Image
              style={styles.image}
              source={require("../Images/twitter.png")}
            />
            <Text style={styles.texte}>Twitter</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.touchable}
            onPress={() => {
              Linking.openURL("https://www.instagram.com/cfdt_officiel/?hl=fr");
            }}
          >
            <Image
              style={styles.image}
              source={require("../Images/insta.png")}
            />
            <Text style={styles.texte}>Instagram</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.touchable}
            onPress={() => {
              Linking.openURL("https://www.dailymotion.com/CFDT_TV");
            }}
          >
            <Image
              style={styles.image}
              source={require("../Images/daylimotion.png")}
            />
            <Text style={styles.texte}>Daylimotion</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.touchable}
            onPress={() => {
              Linking.openURL(
                "https://www.youtube.com/channel/UCAxO-jVPBThh6eFg289Uhaw"
              );
            }}
          >
            <Image
              style={{ width: 70, height: 50, marginLeft: 10 }}
              source={require("../Images/youtube.png")}
            />
            <Text style={styles.texte}>Youtube</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    height: 50,
    width: 50,
    marginHorizontal: 15,
  },
  texte: {
    fontSize: 20,
    padding: 15,
  },
  touchable: {
    flexDirection: "row",
    marginVertical: 0,
    borderColor: "#F6A924",
    backgroundColor: "#F8F8F8",
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    height: 100,
    alignItems: "center",
  },
});

export default Follow;
